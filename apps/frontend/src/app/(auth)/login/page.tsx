import React from 'react'
import Login from './login'
import { validateRequest } from '@/lib/actions/auth/validate-request'
import { redirect } from 'next/navigation'
import { redirects } from '@/lib/constants'

const LoginPage = async () => {
  const { user } = await validateRequest()

  if (user) redirect(redirects.afterLogin)

  return <Login />
}

export default LoginPage
