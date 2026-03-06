"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { deleteProduct } from '@/lib/actions/products.actions'
import { redirect } from 'next/navigation';
import React, { useActionState, useState } from 'react'

function DeleteButton({id}:{id: any}) {
    const [data, action] = useActionState(deleteProduct,{
        success: false
    });
    if(data.success){
        return redirect('admin/allproducts');
    }
    const [value, setValue] = useState(id);
  return (
    <form action={action}>
      <Input type='text' name="id" className='hidden' value={value} onChange={(e)=> setValue(id)} />
      <Button type='submit' onClick={()=> deleteProduct} variant="destructive">Delete</Button>
    </form>
  )
}

export default DeleteButton
