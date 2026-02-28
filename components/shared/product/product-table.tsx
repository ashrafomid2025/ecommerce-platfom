import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { prisma } from '@/lib/db'
import Link from 'next/link';
import React from 'react'

async function ProductTable() {
    const products = await prisma.products.findMany();
    console.log(products);
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Delete</TableHead>
                <TableHead>Update</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {products.map((product)=>(
                <TableRow>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price.toString()}</TableCell>
                    <TableCell><img src={product.images[0]} alt={product.name} className='h-6 w-6' /></TableCell>
                    <TableCell><Link href="/admin/deleteProduct" className='hover:text-destructive' >Delete</Link></TableCell>
                    <TableCell><Link href="/admin/updateProduct" className='hover:text-muted-foreground' >Update</Link></TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default ProductTable
