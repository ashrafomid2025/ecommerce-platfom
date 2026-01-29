import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductCard from './ProductCard'

function Product({data,title,limit}:{data:any,title?:string,limit?:number}) {
    const limitedData = limit? data.slice(0,limit):data;
  return (
    <div>
      {title?(<h1 className='text-center w-full font-bold text-3xl py-3'>{title}</h1>):""}
      {limitedData.length >0?(
    <div className='h-fit w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
      {limitedData.map((product:any) =>(
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
    ):(
        <p>No product exists</p>
    )}
    </div>
  )
}

export default Product
