'use client'
import { Button } from '@/components/ui/button'
import { logout } from '@/lib/actions/auth/actions'
import React from 'react'

const DashboardPage = () => {
  async function test() {
    await logout()
  }
  return (
    <div>
      DashboardPage
      <Button onClick={test}>Log out</Button>
    </div>
  )
}

export default DashboardPage
