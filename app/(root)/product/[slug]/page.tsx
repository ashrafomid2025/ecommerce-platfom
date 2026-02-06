import ProductImage from '@/components/shared/Product/product-image';
import { getSingelProduct } from '@/lib/action/product.action';
import React from 'react'

async function page({params}:{params: Promise<{slug:string}>}) {
    const {slug} = await params ;
    const product = await getSingelProduct(slug);
  return (
    <section className='w-full  grid grid-cols-5 gap-3 '>
      <div className='grid-cols-2'>
        {/* image */}
        <ProductImage product={product?.images} />
      </div>
      <div className='grid-cols-2'>
        {/* content */}
      </div>
      <div className='grid-cols-1'>
        {/* add to cart */}
      </div>
    </section>
  )
}

export default page