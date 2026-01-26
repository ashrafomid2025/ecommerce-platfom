import { APP_NAME } from '@/lib/constants';
import React from 'react'

function Footer() {
    const CurrentYear = new Date().getFullYear();
  return (
    <footer className=' w-full flex flex-center py-4 text-xl border-t'>
        <h1>{CurrentYear}{APP_NAME} All Right Reserved </h1>
    </footer>
  )
}

export default Footer