'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { SubmitButton } from '@/components/submit-button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupInput, signupSchema } from './_components/validation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const Register = () => {
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })

  const onSubmit: () => void = form.handleSubmit(
    async (data: SignupInput) => {
        console.log(data)
    }
  )

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Sign up to start using the app</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={onSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="email@example.com"
                        autoComplete="email"
                        type="email"
                        data-cy="email-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage data-cy="error-message-email" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        required
                        autoComplete="current-password"
                        placeholder="********"
                        data-cy="password-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage data-cy="error-message-password" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="John Doe"
                        autoComplete="name"
                        type="text"
                        data-cy="username-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage data-cy="error-message-username" />
                  </FormItem>
                )}
              />
              <div>
                <Link href={'/login'}>
                  <Button variant={'link'} size={'sm'} className="p-0">
                    Already signed up? Login instead.
                  </Button>
                </Link>
              </div>

              <SubmitButton data-cy="register-btn" className="w-full">
                {' '}
                Sign Up
              </SubmitButton>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/">Cancel</Link>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register
