'use server'

import { validateRequest } from '@/lib/actions/auth/validate-request'
import { VerifyEmailInput } from './validation'
import { redirect } from 'next/navigation'
import { redirects } from '@/lib/constants'
import { db } from '@/lib/drizzle/db'
import { emailVerificationCodes, users } from '@/lib/drizzle/schema'
import { eq } from 'drizzle-orm'
import { TimeSpan, createDate, isWithinExpirationDate } from 'oslo'
import { lucia } from '@/lib/actions/auth'
import { cookies } from 'next/headers'
import { timeFromNow } from '@/lib/utils'
import { alphabet, generateRandomString } from 'oslo/crypto'
import { renderVerificationCodeEmail } from '@/lib/mail/email-templates/emailverification'
import { sendMail } from '@/lib/mail/nodemailer'

interface ResendVerifyEmailResponse {
  error?: string
  success?: boolean
}

export async function verifyEmail(formData: VerifyEmailInput) {
  const { code } = formData

  const { user } = await validateRequest()

  if (!user) {
    return redirect(redirects.toLogin)
  }

  const dbCode = await db.transaction(async (tx) => {
    const item = await tx.query.emailVerificationCodes.findFirst({
      where: (table, { eq }) => eq(table.userId, user.id),
    })
    if (item) {
      await tx
        .delete(emailVerificationCodes)
        .where(eq(emailVerificationCodes.id, item.id))
    }
    return item
  })

  if (!dbCode || dbCode.code !== code)
    return {
      fieldError: {
        code: 'Invalid verification code',
      },
    }

  if (!isWithinExpirationDate(dbCode.expiresAt))
    return { formError: 'Verification code expired' }

  if (dbCode.email !== user.email) return { formError: 'Email does not match' }

  await lucia.invalidateUserSessions(user.id)
  await db
    .update(users)
    .set({ emailVerified: true })
    .where(eq(users.id, user.id))
  const session = await lucia.createSession(user.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
  return redirect(redirects.afterLogin)
}

export async function resendVerificationEmail() {
  const { user } = await validateRequest()

  if (!user) {
    return redirect(redirects.toLogin)
  }

  const lastSent = await db.query.emailVerificationCodes.findFirst({
    where: (table, { eq }) => eq(table.userId, user.id),
    columns: { expiresAt: true },
  })

  if (lastSent && isWithinExpirationDate(lastSent.expiresAt)) {
    return {
      error: `Please wait ${timeFromNow(lastSent.expiresAt)} before resending`,
    }
  }

  const verificationCode = await generateEmailVerificationCode(
    user.id,
    user.email
  )

  await sendMail({
    to: user.email,
    subject: 'Verify your account',
    body: renderVerificationCodeEmail({ code: verificationCode }),
  })

  return { success: true }
}

async function generateEmailVerificationCode(userId: string, email: string) {
  await db
    .delete(emailVerificationCodes)
    .where(eq(emailVerificationCodes.userId, userId))

  const code = generateRandomString(8, alphabet('0-9')) // 8 digit code

  await db.insert(emailVerificationCodes).values({
    userId,
    email,
    code,
    expiresAt: createDate(new TimeSpan(10, 'm')), // 10 minutes
  })

  return code
}
