import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { prisma } from '@/lib/db'
import Image from 'next/image';
import React from 'react'
import { Button } from '@/components/ui/button';

async function ProductTable() {
    const products = await prisma.products.findMany();
  return (
    <div className='p-4 overflow-x-auto'>
    <Table>
        <TableHeader className='bg-black px-2'>
            <TableRow className='text-center'>
                <TableHead className='text-white px-2'>Product Name</TableHead>
                <TableHead className='text-white px-2'>Brand</TableHead>
                <TableHead className='text-white px-2'>Price</TableHead>
                <TableHead className='text-white px-2'>Image</TableHead>
                <TableHead className='text-white px-2' colSpan={2}>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {products.map((product)=>(
                <TableRow className='even:bg-gray-200' key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.price.toString()}</TableCell>
                    <TableCell><Image src={product.images[0]} alt={product.name} height={100} width={100} /></TableCell>
                    <TableCell><Button variant="destructive">Delete</Button></TableCell>
                    <TableCell><Button variant="outline">Update</Button></TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    </div>
  )
}

export default ProductTable
