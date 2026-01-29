"use client";
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function NotFoundPage() {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center'>
      <Image src='/images/logo.svg' alt={`${APP_NAME} logo`} height={48} width={48} />
      <div className="p-6 shadow-md text-center rounded">
        <h1 className="text-3xl font-bold">Not Found</h1>
        <p className="text-destructive">Could not found this page.</p>
        <Button variant='outline'>
            <Link href="/">
            Back to Home
            </Link>
            </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
