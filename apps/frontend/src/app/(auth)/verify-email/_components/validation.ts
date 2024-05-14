import { z } from 'zod'

export const verifyEmailSchema = z.object({
  code: z.string().length(8, 'Please enter a valid code'),
})

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>
