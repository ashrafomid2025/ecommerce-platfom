import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Product({data,title}:{data:any,title?:string}) {
  return (
    <div>
      {title?(<h1 className='text-center w-full font-bold text-3xl py-3'>{title}</h1>):""}
    <div className='h-fit w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
      {data.map((product:any) =>(
        <Card key={product.slug}>
            <CardHeader>
                <Link href="">
                <Image src={`${product.images[1]}`} alt='Product' height={700} width={700} />
                </Link>
            </CardHeader>
            <CardContent>
                <h1 className='font-bold text-center'>{product.name}</h1>
            </CardContent>
        </Card>
      ))}
    </div>
    </div>
  )
}

export default Product
