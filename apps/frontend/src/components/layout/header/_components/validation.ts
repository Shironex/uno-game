import { z } from 'zod'

export const feedBackSchema = z.object({
  name: z.string().min(2, {
    message: 'Name is required',
  }),
  feedback: z.string().min(1, { message: 'Feedback is required' }),
})

export type feedBackInput = z.infer<typeof feedBackSchema>
