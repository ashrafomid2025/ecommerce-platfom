import ProductImage from '@/components/shared/Product/product-image';
import Stock from '@/components/shared/Product/stock';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getSingelProduct } from '@/lib/action/product.action';
import React from 'react'

async function page({params}:{params: Promise<{slug:string}>}) {
    const {slug} = await params ;
    const product = await getSingelProduct(slug);
  return (
    <>
    <section className=' grid grid-cols-5 py-2 gap-3 '>
      <div className=' col-span-2 '>
        {/* image */}
        <ProductImage images={product?.images} />
      </div>
      <div className=' col-span-2 flex flex-col gap-12 py-12'>
        {/* content */}
        <div className='flex flex-col gap-8 p-2'>
          <p>{product?.brand} {product?.category}</p>
          <h1 className=' h2-bold'>{product?.name}</h1>
          <div className='flex gap-3 '>
            <Stock value={Number(product?.price)} className="bg-green-100 text-green-800 px-4 py-0.5 rounded-3xl" />
          </div>
          <p>
            {product?.rating.toString()} of {product?.numReviews} Reviews
          </p>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-bold text-xl'>Description</p>
          <p>{product?.description}</p>
        </div>
      </div>
      <div className=' col-span-1  pr-6 py-12'>
        {/* add to cart */}
        <Card className='px-4'>
          <CardContent className='flex gap-5 flex-col'>
            <div className='flex justify-between'>
              <p>Price</p>
              <Stock value={Number(product?.price)} />
            </div>
            <div className='flex justify-between'>
              <div>Status</div>
              {product?.stock > 0 ? (
                <Badge variant="outline">
                  Available
                </Badge>
                ):(<Badge variant="destructive">UnAvailable</Badge>)}
            </div>
            {product?.stock >0 &&(
              <div className='w-full flex-center'>
                <Button className='w-full'>Add To cart</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
    </>
  )
}

export default page