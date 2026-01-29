import { cn } from '@/lib/utils';
import React from 'react'

function ProductPrice({price,className}:{price:number,className?:string}) {
    const stringValue = price.toFixed(2);
    const [int, float] = stringValue.split(".");
  return (
    <p className={cn('text-2xl',className)}>
        <span className='text-xs align-super'>$</span>
        {int}
        <span className='text-xs align-super'>.{float}</span>
    </p>
  )
}

export default ProductPrice
