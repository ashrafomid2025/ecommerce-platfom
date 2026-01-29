import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Product({product}:{product:any}) {
  return (
      <Card>
        <CardHeader>
          <Image src={product.image[0]} alt={product.name} />
        </CardHeader>
        <CardContent>
          <h1>{product.brand}</h1>
          <Link href={`product/${product.slug}`}>
          <h1>{product.name}</h1>
          </Link>
          <div>
            <p>{product.rating}Stars</p>
            {product.stock?(
              <p>{product.stock}</p>
            ):(
              <h1>Out Of Stock</h1>
            )}
          </div>
        </CardContent>
      </Card>
  )
}

export default Product