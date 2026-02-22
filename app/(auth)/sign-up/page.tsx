import { auth } from '@/auth'
import SignUpForm from '@/components/sign-up-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { APP_NAME } from '@/lib/constants'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata:Metadata = {
    title: "Sign Up",
}

async function SignUp() {
    const session = await auth();
    if(session){
      return  redirect("/");
    }
  return (
    <div className='w-full max-w-md mx-auto'>
        <Card>
            <CardHeader className='space-y-4'>
                <Link href="/" className='w-full flex justify-center'>
                <Image src="images/logo.svg" alt={APP_NAME} height={100} width={100} />
                </Link>
                <CardTitle className='text-center'>Sign Up</CardTitle>
                <CardDescription className='text-center'>
                   Insert the information below to sign up
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* input */}
                <SignUpForm />
            </CardContent>
        </Card>
    </div>
  )
}

export default SignUp
