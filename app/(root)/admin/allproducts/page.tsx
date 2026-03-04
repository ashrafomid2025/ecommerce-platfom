import { auth } from '@/auth'
import SearchForm from '@/components/shared/product/search-form';
import { searchProduct } from '@/lib/actions/products.actions';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'

 async function page() {
    const session = await auth();
    if(session){
        const id = session.user?.id;
        const user = await prisma.user.findFirst({
            where: { id: id}
        });
        if(user?.role === "admin"){
            const products = await prisma.products.findMany();
            const serializeProducts = products.map(product => ({
                ...product,
                price: Number(product.price),
                rating: Number(product.rating)
            }));
            return (
                <div className='w-full p-4'>
                    <SearchForm  initialValue={serializeProducts} action={searchProduct}/>
                </div>
            )
        }
        else{
            return redirect("/");
        }
    }
    else{
  return redirect("/sign-in");
  }
}

export default page
