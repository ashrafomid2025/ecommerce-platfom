import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import Stock from './stock'
import { product } from '@/lib/types/product'

function Product({product}:{product:product}) {
  return (
      <Card className='w-full max-w-sm'>
        <CardHeader className='items-center flex justify-center p-0'>
          <Link href={`product/${product.slug}`}>
          <Image src={product.images[0]} alt={product.name} height={300} width={300} />
          </Link>
        </CardHeader>
        <CardContent className='grid gap-4 p-4'>
          <h1 className='text-xs'>{product.brand}</h1>
          <Link href={`product/${product.slug}`}>
          <h1 className='text-sm font-medium'>{product.name}</h1>
          </Link>
          <div className='flex-between gap-4'>
            <p>{product.rating}Stars</p>
            {product.stock?(
              <Stock value= {Number(product.price)} />
            ):(
              <h1 className='text-destructive'>Out Of Stock</h1>
            )}
          </div>
        </CardContent>
      </Card>
  )
}

export default Product