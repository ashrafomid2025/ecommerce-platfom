import ProductImage from '@/components/shared/product/Product-image';
import ProductPrice from '@/components/shared/product/ProductPrice';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getSingleProduct } from '@/lib/actions/products.actions';
import { notFound } from 'next/navigation';
import React from 'react'

async function DetailsPage({params}:{params:Promise<{slug:string}>}) {
    const {slug} = await params;
    const product = await getSingleProduct(slug);
    if(!product){
        return notFound();
    }
  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-1.5">
            <div className="col-span-2">
                {/* image */}
                <ProductImage images={product.images} />
            </div>
            <div className="col-span-2">
                {/* details */}
                <div className="flex flex-col gap-6">
                    <p>{product.brand} {product.category} </p>
                    <h1 className="h3-bold">{product.name}</h1>
                    <div className="flex gap-3 sm:items-center">
                        <ProductPrice price={Number(product.price)} className='w-24 py-2 px-5 rounded-full text-green-700 bg-green-100' />
                    </div>
                    <p>{product.rating.toString()} of {product.numReviews} Reviews</p>
                </div>
                <div className="mt-10">
                    <p className="font-semibold">Description</p>
                    <p>{product.description}</p>
                </div>
            </div>
            <div>
                {/* order */}
                <Card className='px-4'>
                    <CardContent className='w-full flex flex-col gap-3'>
                        <div className="flex justify-between">
                            <div>Price</div>
                            <div>
                                <ProductPrice price={Number(product.price)} /> 
                            </div>
                        </div>
                            <div className="flex justify-between">
                                <div>Status</div>
                                {product.stock>0?(<Badge variant="outline">Available</Badge>):(<Badge variant="destructive">Unavailable</Badge>)}
                            </div>
                            {product.stock>0 && (
                                <div className="flex-center">
                                    <Button className='w-full'>Add To Cart</Button>
                                </div>
                            )}
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>
    </>
  )
}

export default DetailsPage
