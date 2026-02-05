import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductPrice from './ProductPrice'
import { ProductInfo } from '@/types/product'

function ProductCard({product}:{product:ProductInfo}) {
  return (
    <Card>
            <CardHeader>
                <Link href={`product/${product.slug}`}>
                <Image src={`${product.images[1]}`} alt={`${product.name}`} priority={true} height={700} width={700} />
                </Link>
            </CardHeader>
            <CardContent className='p-4 grid gap-4'>
                <p className='text-xs'>{product.brand}</p>
                <Link href={`product/${product.slug}`}>
                <h1 className='font-medium text-sm'>{product.name}</h1>
                </Link>
                <div className='flex-between gap-4'>
                    <p className='text-lg'>{product.rating} Stars</p>
                    {product.stock >0?(
                    <ProductPrice price={Number(product.price)} />
                    ):(
                        <p className='text-destructive'>Out of stock</p>
                    )}
                </div>
            </CardContent>
        </Card>
  )
}

export default ProductCard
