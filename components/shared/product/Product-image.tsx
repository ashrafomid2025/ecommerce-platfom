"use client";
import { cn } from '@/lib/utils';
import Image from 'next/image'
import React, { useState } from 'react'

function ProductImage({images}:{images:string[]}) {
    const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className='space-y-4'>
      <Image className='min-h-75 object-cover object-center' src={`${images[currentIndex]}`} alt='Product image' height={1000} width={1000} />
      <div className="flex gap-3">
        {images.map((image,index)=>(
            <div onClick={()=> setCurrentIndex(index)} key={index} className={cn('border rounded-md cursor-pointer hover:border-orange-700',currentIndex === index && 'border-orange-400')}>
                <Image src={`${image}`} alt='Product image' height={100} width={100} className='rounded-md' />
            </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImage
