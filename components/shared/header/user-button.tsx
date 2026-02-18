import { auth } from '@/auth'
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { signOutUser } from '@/lib/actions/auth.action';
import { UserCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react'


async function UserButton() {
    const session = await auth();
    if(!session){
        return (
            <Button asChild>
                <Link href="/sign-in"><UserCircle /> Sign in</Link>
            </Button>
        )
    }
    const firstLetterOfName = session.user?.name?.charAt(0).toUpperCase() || "U";
  return (
    <div className='flex gap-2 items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <div className='flex justify-center items-center'>
                <Button variant="ghost" className='relative ml-2 w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center'>{firstLetterOfName}</Button>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
                <div className="flex flex-col space-y-1">
                <div className="font-medium text-sm leading-none">
                    {session.user?.name}
                </div>
                <div className="text-sm text-muted-foreground leading-none">{session.user?.email}</div>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuItem className='p-0 mb-1'>
                <div>
                    <form action={signOutUser} className='w-full'>
                        <Button type='submit' variant="ghost">Sign Out</Button>
                    </form>
                </div>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserButton
