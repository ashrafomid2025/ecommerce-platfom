import { Button } from '@/components/ui/button'
import { EllipsisVertical, ShoppingCart, UserIcon } from 'lucide-react'
import Link from 'next/link'
import ToggelTheame from './Toggel-Theme'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

function Menu() {
  return (
    <div className='flex justify-end gap-3'>
        <nav className='hidden md:flex w-full max-w-xs gap-1'>
              <ToggelTheame/>
       <Button variant="ghost" className='font-bold' asChild>
        <Link href="/cart" className='flex space-x-2'><ShoppingCart /> Cart</Link>
       </Button>
         <Button className='font-bold' asChild>
        <Link href="/cart"><UserIcon /> sign In</Link>
       </Button>
        </nav>
        {/* nav one */}
        <nav className='md:hidden'>
            <Sheet>
                <SheetTrigger className=" align-middle">
                    <EllipsisVertical />
                </SheetTrigger>
                <SheetContent className="flex flex-col items-start pl-3">
                    <SheetTitle>Menu</SheetTitle>
                      <ToggelTheame/>
       <Button variant="ghost" className='font-bold' asChild>
        <Link href="/cart" className='flex space-x-2'><ShoppingCart /> Cart</Link>
       </Button>
         <Button className='font-bold' asChild>
        <Link href="/cart"><UserIcon /> sign In</Link>
       </Button>
                    <SheetDescription></SheetDescription>
                </SheetContent>
            </Sheet>
        </nav>
    </div>
  )
}

export default Menu