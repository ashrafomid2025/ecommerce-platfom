"use client"
import { Input } from './ui/input'
import { Label } from './ui/label'
import { signInDefaultValue } from '@/lib/constants'
import { Button } from './ui/button'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { signInuserWithCredentiols } from '@/lib/action/auth.action'
import Link from 'next/link'
function SignInButton(){
    const {pending} = useFormStatus();
    return(
        <div className='space-y-4'>
                <Button disabled={pending? true: false} variant="default" className='w-full'>
                    {pending? "signing In...":"Sign In"}
                </Button>
        </div>
    )
}
function LoginwithCredintal() {
    const [data , action] = useActionState(signInuserWithCredentiols, {
        success: false,
        message: "",
    });
    {}
  return (
    <form action={action}>
        <div className=' space-y-4 flex flex-col '>
            <div className='space-y-1'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email'  name='email' autoCapitalize='email' defaultValue={signInDefaultValue.email} />
            </div>
             <div className='space-y-1'>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' type='password'  name='password' autoCapitalize='password' defaultValue={signInDefaultValue.password} />
            </div>
            <SignInButton />
            <h1 className=' text-center font-medium'>Dont You Have In Account? <Link href="/sign-up">Sign Up</Link> </h1>
            {/* button */}
            {data && !data.success && (
                <div className='text-center text-destructive'>{data.message}</div>
            )}
        </div>
    </form>
  )
}

export default LoginwithCredintal