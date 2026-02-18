"use client"
import { Input } from './ui/input'
import { Label } from './ui/label'
import { signUpDefaultValue } from '@/lib/constants'
import { Button } from './ui/button'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import {  signUpuser } from '@/lib/action/auth.action'
import Link from 'next/link'
function SignUpButton(){
    const {pending} = useFormStatus();
    return(
        <div className='space-y-4'>
                <Button disabled={pending? true: false} variant="default" className='w-full'>
                    {pending? "Submeting...":"Sign Up"}
                </Button>
        </div>
    )
}
function SignUpUser() {
    const [data , action] = useActionState(signUpuser, {
        success: false,
        message: "",
    });
    {}
  return (
    <form action={action}>
        <div className=' space-y-4'>
             <div className='space-y-1'>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' type='text'  name='name' autoCapitalize='name' defaultValue={signUpDefaultValue.name} />
            </div>
            <div className='space-y-1'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email'  name='email' autoCapitalize='email' defaultValue={signUpDefaultValue.email} />
            </div>
             <div className='space-y-1'>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' type='password'  name='password' autoCapitalize='password' defaultValue={signUpDefaultValue.password} />
            </div>
            <div className='space-y-1'>
                <Label htmlFor='ConfirmPassword'>Confirm Password</Label>
                <Input id='ConfirmPassword' type='password'  name='confirmPassword' autoCapitalize='password' defaultValue={signUpDefaultValue.confirmPassword} />
            </div>
            <SignUpButton />
              {data && !data.success && (
                <div className='text-center text-destructive'>{data.message}</div>
            )}
            <h1 className=' text-center font-medium'> Already have an Account? <Link href="/sign-in">Sign In</Link> </h1>
            {/* button */}
          
        </div>
    </form>
  )
}

export default SignUpUser