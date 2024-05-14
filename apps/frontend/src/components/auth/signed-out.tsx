import { AwaitedReactNode } from 'react'
import { validateRequest } from '@/lib/actions/auth/validate-request'

export async function SignedOut({ children }: { children: AwaitedReactNode }) {
  const { user } = await validateRequest()

  return user == null && children
}
