import Link from 'next/link'
import React from 'react'
import ProductCard from './ProductCard'
import { ProductInfo } from '@/lib/types/product'

function Product({data,title,limit}:{data:ProductInfo[],title?:string,limit?:number}) {
    const limitedData = limit? data.slice(0,limit):data;
  return (
    <div>
      {title?(<h1 className='w-full font-bold text-2xl py-3'>{title}</h1>):""}
      {limitedData.length >0?(
    <div className='h-fit w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
      {limitedData.map((product:ProductInfo) =>(
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
