'use server'
import { db } from '@/lib/drizzle/db'
import { SignupInput } from './validation'
import { Scrypt, generateId } from 'lucia'
import { emailVerificationCodes, users } from '@/lib/drizzle/schema'
import { sendMail } from '@/lib/mail/nodemailer'
import { renderVerificationCodeEmail } from '@/lib/mail/email-templates/emailverification'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { redirects } from '@/lib/constants'
import { generateRandomString, alphabet } from 'oslo/crypto'
import { TimeSpan, createDate } from 'oslo'
import { eq } from 'drizzle-orm'
import { lucia } from '@/lib/actions/auth'

type generateEmailCode = {
  userId: string
  email: string
}

export async function signUp(formData: SignupInput) {
  const { email, password, name } = formData

  const existingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
    columns: { email: true },
  })

  if (existingUser) {
    return {
      formError: 'User with this email already exists.',
    }
  }

  const userId = generateId(21)

  const hashedPassword = await new Scrypt().hash(password)

  await db.insert(users).values({
    id: userId,
    role: 'user',
    name,
    email,
    hashedPassword,
  })

  const verificationCode = await generateEmailVerificationCode({
    userId,
    email,
  })

  await sendMail({
    to: email,
    subject: 'Verify your account',
    body: renderVerificationCodeEmail({ code: verificationCode }),
  })

  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect(redirects.toVerify)
}

async function generateEmailVerificationCode(data: generateEmailCode) {
  await db
    .delete(emailVerificationCodes)
    .where(eq(emailVerificationCodes.userId, data.userId))

  const code = generateRandomString(8, alphabet('0-9')) // 8 digit code

  await db.insert(emailVerificationCodes).values({
    userId: data.userId,
    email: data.email,
    code,
    expiresAt: createDate(new TimeSpan(10, 'm')), // 10 minutes
  })

  return code
}
