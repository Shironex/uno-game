'use client'
import { toast } from 'sonner'
import { logout } from '@/lib/actions/auth/actions'
import { SubmitButton } from '@/components/submit-button'
import { TriangleAlertIcon } from 'lucide-react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { VerifyEmailInput, verifyEmailSchema } from './_components/validation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import { resendVerificationEmail, verifyEmail } from './_components/action'

export const VerifyCode = () => {
  const [resendState, resendAction] = useFormState(
    resendVerificationEmail,
    null
  )
  const form = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
  })

  const handleSubmit: () => void = form.handleSubmit(
    async (data: VerifyEmailInput) => {
      const response = await verifyEmail(data)

      if (response?.fieldError) {
        for (const key in response.fieldError) {
          form.setError(key as keyof VerifyEmailInput, {
            type: 'manual',
            message: response.fieldError[key as keyof VerifyEmailInput]!,
          })
        }
      }

      if (response?.formError) {
        return toast(response.formError, {
          icon: <TriangleAlertIcon className="h-5 w-5 text-primary" />,
        })
      }
    }
  )

  useEffect(() => {
    if (resendState?.success) {
      toast('Email sent!')
    }
    if (resendState?.error) {
      toast(resendState.error, {
        icon: <TriangleAlertIcon className="h-5 w-5 text-primary" />,
      })
    }
  }, [resendState?.error, resendState?.success])

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form action={handleSubmit}>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={8}
                    className="mt-2"
                    data-cy="otp-input"
                    {...field}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                      <InputOTPSlot index={6} />
                      <InputOTPSlot index={7} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton data-cy="verify-btn" className="mt-4 w-full">
            Verify
          </SubmitButton>
        </form>
      </Form>
      <form action={resendAction}>
        <SubmitButton className="w-full" variant="secondary">
          Resend Code
        </SubmitButton>
      </form>
      <form action={logout}>
        <SubmitButton variant="link" className="p-0 font-normal">
          want to use another email? Log out now.
        </SubmitButton>
      </form>
    </div>
  )
}
