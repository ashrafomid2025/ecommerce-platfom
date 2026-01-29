import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import { ShoppingCart, UserCircle } from 'lucide-react'
import { headers } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Theme from './Theme'
import Menu from './menu'

function Header() {
  return (
    <header className='w-full border-b'>
        <div className='wrapper flex-between'>
            <div className='flex-start gap-1'>
                <Link href="/" className='flex-start'>
                <Image src="/images/logo.svg" alt={`${APP_NAME} logo`} height={49} width={49} priority={true} className='h-12 w-12'/>
                <span className="hidden lg:block text-2xl font-bold ml-3">{APP_NAME}</span>
                </Link>
            </div>
            <Menu />
        </div>
    </header>
  )
}

export default Header
