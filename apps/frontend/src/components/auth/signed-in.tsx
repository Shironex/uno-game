import { validateRequest } from '@/lib/actions/auth/validate-request'
import { AwaitedReactNode } from 'react'

export async function SignedIn({ children }: { children: AwaitedReactNode }) {
  const { user } = await validateRequest()

  return user !== null && children
}
