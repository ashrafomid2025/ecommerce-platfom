import React from 'react'
import Theme from './Theme'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { EllipsisVertical, ShoppingCart, UserCircle } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

function Menu() {
  return (
    <div className='flex justify-end gap-3'>
      <nav className='hidden md:flex w-full max-w-xs gap-1'>
        <Theme />
                <Button asChild variant="ghost">
                    <Link href="/cart" ><ShoppingCart /> Cart</Link>
                </Button>
                <Button asChild >
                    <Link href="/sign-in" ><UserCircle /> Sign in</Link>
                </Button>
      </nav>
      <nav className='md:hidden'>
        <Sheet>
            <SheetTrigger className='align-middle'>
                <EllipsisVertical />
            </SheetTrigger>
            <SheetContent className='flex flex-col items-start gap-1 pl-3'>
                <SheetTitle>Menu</SheetTitle>
                <Theme />
                <Button asChild variant="ghost">
                    <Link href="/cart" ><ShoppingCart /> Cart</Link>
                </Button>
                <Button asChild >
                    <Link href="/sign-in" ><UserCircle /> Sign in</Link>
                </Button>
                <SheetDescription></SheetDescription>
            </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}

export default Menu
