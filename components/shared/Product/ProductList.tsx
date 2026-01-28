import React from 'react'

function ProductList({data,title}:{data:any , title? :string}) {
  return (
    <div>
        <div className='mt-7'>
            {title? (
            <h1 className="h2-bold mb-4">
                {title}
            </h1>
            ):""}
        </div>
        <div className=' w-full grid grid-cols-1 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {data.map((product:any)=>(
                <div key={product.slug}>
                    <h1>{product.name}</h1>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ProductList