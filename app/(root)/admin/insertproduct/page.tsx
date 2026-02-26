import { auth } from '@/auth'
import ProductForm from '@/components/shared/product/product-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { APP_NAME, productDefaultValue } from '@/lib/constants';
import { prisma } from '@/lib/db';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

async function InsertPage() {
    const session = await auth();
    if(session){
        const id = session.user?.id;
        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        });
        if(user?.role === "admin"){
            return (
                // <div>Welcome to the admin page</div>
                <div className='w-full grid grid-cols-1 md:grid-cols-3 border p-2 rounded-md shadow-2xs'>
                    <div className='relative col-span-1'>
                        {/* image */}
                        <h1 className='font-bold text-center absolute top-4 left-1/2 -translate-x-1/2'>Add Product</h1>
                        <img src="/images/p-banner.png" className='object-cover w-full h-full' alt="" />
                    </div>
                    <div className='col-span-2'>
                        {/* form */}
                        <ProductForm />
                    </div>
                </div>
            )
        }
        else{
            return redirect('/');
        }
    }
    else{
        return redirect("/sign-in");
    }
  
}

export default InsertPage
