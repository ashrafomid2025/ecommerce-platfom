import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import React from 'react'

function NotFountPage() {
  return (
    <div className='flex flex-col justify-center items-center gap-2 h-screen w-full'>
    <Image src="/images/logo.svg" alt={APP_NAME} height={52} width={52} />
    <div className="p-6 shadow-md text-center">
        <h1 className='text-3xl font-bold'>Not Found</h1>
        <p>Could not fount the requested page</p>
        <Button variant="outline"> back to home</Button>
    </div>
    </div>
  )
}

export default NotFountPage