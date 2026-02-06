"use client";
import { cn } from '@/lib/utils';
import Image from 'next/image'
import React, { useState } from 'react'

function ProductImage({images}:{images:string[]}) {
    const [currentIndex , setCurrentIndex] = useState(0);
  return (
        <div className=' space-y-4'>
            <Image src={images[currentIndex]} alt='product image' height={1000} width={1000} className=' object-cover object-center min-h-75' />
            <div className='flex space-x-3 justify-center'>
                {images.map((img , index)=>(
                    <div key={index} onClick={()=> setCurrentIndex(index)} className={cn("border cursor-pointer hover:border-orange-700 " , currentIndex === index && 'border-orange-900')}>
                        <Image src={img} alt='product Image' height={100} width={100} />
                    </div>
                ))}
            </div>
        </div>
  )
}

export default ProductImage