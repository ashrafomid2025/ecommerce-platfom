import { auth } from '@/auth'
import ProductTable from '@/components/shared/product/product-table';
import SearchForm from '@/components/shared/product/search-form';
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
            return (
                <div>
                    <SearchForm />
                    <ProductTable />
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
