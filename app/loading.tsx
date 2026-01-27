import Image from 'next/image'
import React from 'react'
import loader from './assets/loader.gif'
import { APP_NAME } from '@/lib/constants'
function loading() {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
        <Image src={loader} alt={APP_NAME} height={120} width={120} />
    </div>
  )
}

export default loading