import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import { ShoppingCart, UserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ToggelTheame from '../Toggel-Theme'

function Header() {
  return (
   <header className='w-full flex-between px-5 border-b py-3'>
    <div className=' flex-start flex'>
        <Image src='/images/logo.svg' alt={APP_NAME} height={36} width={36} />
        <span className='font-bold text-xl px-2'>{APP_NAME}</span>
    </div>
    <div className=' space-x-2'>
      <ToggelTheame/>
       <Button variant="ghost" className='font-bold' asChild>
        <Link href="/cart" className='flex space-x-2'><ShoppingCart /> Cart</Link>
       </Button>
         <Button className='font-bold' asChild>
        <Link href="/cart"><UserIcon /> sign In</Link>
       </Button>
    </div>
   </header>
  )
}

export default Header