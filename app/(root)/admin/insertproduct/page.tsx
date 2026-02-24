import { auth } from '@/auth'
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
                <div className='max-w-2xl h-fit w-full mx-auto'>
                    <div className='flex flex-col items-center justify-center gap-3 p-6'>
                        {/* image */}
                        <Image src="/images/logo.svg" alt={`${APP_NAME}`} height={100} width={100} />
                        <p className='text-xl font-bold'>Register your product</p>
                    </div>
                    <div>
                        <form action="" className='grid grid-cols-1 md:grid-cols-2 gap-4 py-2 w-full'>
                            <div className="space-y-4">
                            <div className='space-y-2'>
                                <Label htmlFor='name'>Product Name</Label>
                                <Input id='name' type='text' name='name' autoComplete='name' defaultValue={productDefaultValue.name} />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='slug'>Slug</Label>
                                <Input id='slug' type='text' name='slug' autoComplete='slug' defaultValue={productDefaultValue.slug} />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='category'>Category</Label>
                                <Input id='category' type='text' name='category' autoComplete='category' defaultValue={productDefaultValue.category} />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='brand'>Brand</Label>
                                <Input id='brand' type='text' name='brand' autoComplete='brand' defaultValue={productDefaultValue.brand} />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='stock'>Available in stock</Label>
                                <Input id='stock' type='text' name='stock' autoComplete='stock' defaultValue={productDefaultValue.stock} />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='price'>Price</Label>
                                <Input id='price' type='number' name='price' autoComplete='price' defaultValue={productDefaultValue.price} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className='space-y-2'>
                                <Label htmlFor='isFeatured'>As featured product</Label>
                                <Input id='isFeatured' type='number' name='isFeatured' autoComplete='isFeatured' defaultValue={productDefaultValue.isfeatured} />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='images'>Product images</Label>
                            <div className="grid grid-cols-l md:grid-cols-2 gap-3">
                                <Input id='images' type='file' name='image1' defaultValue={productDefaultValue.images[0]} />
                                <Input id='images' type='file' name='image2' defaultValue={productDefaultValue.images[1]} />
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='description'>Product description</Label>
                                <textarea name="description" id="description" defaultValue={productDefaultValue.description} placeholder="Enter product's description" className='resize-none placeholder:text-sm rounded-md px-3 py-1 border h-32 w-full'></textarea>
                            </div>
                            <Button type='submit' variant="default" className='w-full'>Save</Button>
                        </div>
                        </form>
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
