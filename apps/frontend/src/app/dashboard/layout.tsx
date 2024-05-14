import { WebSocketProvider } from '@/context/websocket-context'
import { validateRequest } from '@/lib/actions/auth/validate-request'
import { redirects } from '@/lib/constants'
import { redirect } from 'next/navigation'
import React from 'react'

type DashboardLayoutProps = {
  children: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const { user } = await validateRequest()

  if (!user) {
    return redirect(`${redirects.toLogin}?from=${redirects.afterLogin}`)
  }

  return <WebSocketProvider>{children}</WebSocketProvider>
}

export default DashboardLayout