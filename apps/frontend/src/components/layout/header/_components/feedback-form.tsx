'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { feedBackInput, feedBackSchema } from './validation'
import { env } from '@/env.mjs'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { SubmitButton } from '@/components/submit-button'
import { Textarea } from '@/components/ui/textarea'

type FeedbackFormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function FeedbackForm({ setOpen }: FeedbackFormProps) {
  const form = useForm<feedBackInput>({
    resolver: zodResolver(feedBackSchema),
    defaultValues: {
      name: '',
      feedback: '',
    },
  })

  const { toast } = useToast()

  const onSubmit = form.handleSubmit(async (data: feedBackInput) => {
    try {
      await fetch('https://projectplannerai.com/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          feedback: data.feedback,
          projectId: env.NEXT_PUBLIC_PROJECT_PLANNER_ID,
        }),
      })

      form.reset()
      setOpen(false)

      toast({
        title: 'Feedback submitted',
        description: 'Thank you for your feedback',
      })
    } catch (error) {
      console.error('Failed to send feedback:', error)
      toast({
        title: 'Failed to send feedback',
        description: 'Please try again later',
      })
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className={'grid gap-4'}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  type="name"
                  id="name"
                  placeholder="Jane Doe"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="feedback">Feedback</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="max-h-32 w-full"
                  required
                  id="feedback"
                  placeholder="Tell us how we can improve our product"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <SubmitButton>
            {form.formState.isSubmitting
              ? 'Sending feedback...'
              : 'Send feedback'}
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}
