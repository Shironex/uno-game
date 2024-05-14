import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      {children}
    </main>
  )
}

export default AuthLayout
