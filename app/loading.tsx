import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import React from 'react'
import loader from './assets/loader.gif'

function loadingPage() {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <Image src={loader} alt={`Loading...`} height={78} width={78} />
    </div>
  )
}

export default loadingPage
