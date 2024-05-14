'use server'

import { db } from '@/lib/drizzle/db'
import { LoginInput } from './validation'
import { lucia } from '@/lib/actions/auth'
import { cookies } from 'next/headers'
import { Scrypt } from 'lucia'

export async function login(formData: LoginInput) {
  const { email, password } = formData

  const existingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
  })

  if (!existingUser || !existingUser?.hashedPassword) {
    return {
      formError: 'Incorrect email or password',
    }
  }

  const validPassword = await new Scrypt().verify(
    existingUser.hashedPassword,
    password
  )

  if (!validPassword) {
    return {
      formError: 'Incorrect email or password',
    }
  }

  const session = await lucia.createSession(existingUser.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return {
    success: `Welcome back ${existingUser.name}`,
  }
}
