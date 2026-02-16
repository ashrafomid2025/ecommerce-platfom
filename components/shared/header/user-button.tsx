import { DropdownMenu , DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
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
              <Link href="/cart">
                <UserIcon /> Sign In
              </Link>
            </Button>
        )
    }
    const firstLetterOfName = session.user?.name?.charAt(0).toUpperCase() || "U";
  return (
    <div className='flex gap-2 items-center'>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className='flex justify-center items-center'>
                    <Button variant="ghost" className='flex justify-center items-center relative h-8 w-8  rounded-full bg-gray-200'>{firstLetterOfName}</Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className='flex flex-col gap-2'>
                    <div className='font-medium '>
                        {session.user?.name}
                    </div>
                    <div className='text-sm text-muted-foreground'>
                        {session.user?.email}
                    </div>
                    <form action={signOutuser}>
                        <Button type='submit' variant="ghost">Sign Out</Button>
                    </form>
                </DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default UserButton