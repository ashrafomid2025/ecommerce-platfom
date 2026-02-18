import { DropdownMenu , DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';
import { signOutuser } from '@/lib/action/auth.action';
async function UserButton() {
    const session = await auth();
    if(!session){
        return(
             <Button asChild>
              <Link href="/sign-in">
                <UserIcon /> Sign In
              </Link>
            </Button>
        )
    }
    const firstLetterOfName = session.user?.name?.charAt(0).toLocaleUpperCase();
  return (
    <div className='flex gap-2 items-center '>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className='flex justify-center items-center'>
                    <Button variant="ghost" className='flex justify-center items-center relative h-8 w-8  rounded-full bg-gray-200'>{firstLetterOfName}</Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount >
                <DropdownMenuLabel className='font-normal'>
                    <div className='font-medium  text-sm leading-none'>
                        {session.user?.name}
                    </div>
                    <div className='text-sm text-muted-foreground leading-none'>
                        {session.user?.email}
                    </div>
                   
                </DropdownMenuLabel>
                <DropdownMenuItem  className='p-0 mb-1'>
                     <form action={signOutuser} className='w-full'>
                        <Button type='submit' variant="ghost" className='w-full py-4 px-2 h-4 justify-start'>Sign Out</Button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default UserButton