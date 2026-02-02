import Link from 'next/link'
import React from 'react'
import ProductCard from './ProductCard'

function Product({data,title}:{data:any,title?:string}) {
    const limitedData = data;
  return (
    <div>
      {title?(<h1 className='w-full font-bold text-2xl py-3'>{title}</h1>):""}
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
