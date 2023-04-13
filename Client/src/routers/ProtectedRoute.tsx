import React from 'react'
import { SignedIn, useAuth } from '@clerk/clerk-react'
import UnAuthorizedPage from '../pages/UnAuthorized/UnAuthorizedPage'

type Props = {
    children: React.ReactNode
}

const ProtectedRoute = ({ children } : Props) => {
  const { isSignedIn } = useAuth();
  console.log(isSignedIn);
  if (!isSignedIn)
  {
    return <UnAuthorizedPage />
  }

  return (
    <SignedIn>
        {children}
    </SignedIn>
  )
}

export default ProtectedRoute