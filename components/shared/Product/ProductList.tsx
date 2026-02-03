import Product from './Product'
import {  productInfo } from '@/lib/types/product'

function ProductList({data,title}:{data:productInfo , title? :string}) {
  // const limitedData = limit? data.slice(0,4): data;
  return (
    <div>
        <div className='mt-7'>
            {title? (
            <h1 className="h2-bold mb-4">
                {title}
            </h1>
            ):""}
        </div>
        <div className=' w-full grid gap-2 grid-cols-1 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {data.map((product:productInfo)=>(
              <Product key={product.slug} product={product}  />
            ))}
        </div>
    </div>
  )
}

export default ProductList