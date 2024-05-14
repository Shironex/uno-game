import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SignedIn } from '@/components/auth/signed-in'
import { SignedOut } from '@/components/auth/signed-out'
import { ThemeToggle } from '@/components/theme-toggle'
import FeedbackButton from './feedback'
import { Links } from './links'
import Image from 'next/image'
import { env } from '@/env.mjs'
import { validateRequest } from '@/lib/actions/auth/validate-request'
import UserDropdown from './_components/user-dropdown'

export async function Header() {
  const { user } = await validateRequest()

  if (env.MAINTENANCE_MODE === 'true') {
    return null
  }

  return (
    <div className="border-b py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl">
            <Image
              className="h-8 w-8 rounded"
              width="50"
              height="50"
              src="/logo.jpg"
              alt="hero image"
            />
            <span className="font-bold">Uno</span>
          </Link>

          <Links />
        </div>

        <div className="flex justify-between gap-4">
          <SignedIn>
            <Button variant={'secondary'} asChild>
              <Link href="/lobby">Lobby</Link>
            </Button>
          </SignedIn>

          <FeedbackButton />

          <ThemeToggle />

          <SignedIn>
            <UserDropdown user={user} />
          </SignedIn>

          <SignedOut>
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}
