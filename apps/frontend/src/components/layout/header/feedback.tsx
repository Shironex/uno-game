'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { MessageCircleHeart } from 'lucide-react'
import useMediaQuery from '@/hooks/use-media-query'
import { FeedbackForm } from './_components/feedback-form'

export default function FeedbackButton() {
  const [open, setOpen] = React.useState(false)

  const { isMobile } = useMediaQuery()

  const description =
    'We value your feedback. How can we improve your experience?'

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button>
            <MessageCircleHeart />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Feedback</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <FeedbackForm setOpen={setOpen} />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <MessageCircleHeart />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <FeedbackForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
