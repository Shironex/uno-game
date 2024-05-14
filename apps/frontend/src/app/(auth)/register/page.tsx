import React from 'react'
import Register from './register'
import { validateRequest } from '@/lib/actions/auth/validate-request'
import { redirect } from 'next/navigation'
import { redirects } from '@/lib/constants'

const RegisterPage = async () => {
  const { user } = await validateRequest()

  if (user) redirect(redirects.afterLogin)

  return <Register />
}

export default RegisterPage
