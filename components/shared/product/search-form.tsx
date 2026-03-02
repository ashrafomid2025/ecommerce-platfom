"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { searchProduct } from '@/lib/actions/products.actions';
import { Divide } from 'lucide-react';
import Link from 'next/link';
import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom';

function SearchForm() {
    const [ data, action ] = useActionState(searchProduct,{
        success: false,
        data: []
    });
    const {pending} = useFormStatus();
  return (
    <div className='w-full my-3 relative flex justify-center flex-col md:flex-row gap-0.5'>
      <form className='flex justify-center items-center' action={action}>
        <Input type='text' className='w-1/2' name='name' placeholder='What do you want' />
        <Button variant="outline" type='submit' disabled={pending}>{pending?"Searching...":"Search"}</Button>
      </form>
      <div className='absolute bg-white rounded-md shadow-2xl top-8 left-1/2 -translate-x-1/2 z-50'>
        {data && data.data.length >0 && (
            <div className='p-4 text-5xl font-bold text-green-400'>
                {data.data.map(product => (
                    <Link key={product.id} href="" className='link text-2xl font-bold'>
                        {product.name}
                    </Link>
                ))}
            {!data && <div>No Product exists with this name.</div>}
            </div>
        )}
      </div>
    </div>
  )
}

export default SearchForm
