import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function ProductForm() {
  return (
    <form action="" className='flex flex-col gap-2'>
      <div className='grid gap-1 grid-cols-2'>
        <Input type='text' name='name' placeholder='Product Name' />
        <Input type='text' name='slug' placeholder='Product slug' />
      </div>
      <div className='grid gap-1 grid-cols-2'>
        <Input type='number' name='price' placeholder='Product Price' />
        <Input type='number' name='stock' placeholder='Product Stock' />
      </div>
      <div className='grid gap-1 grid-cols-2'>
        <Select name='category'>
            <SelectTrigger className='w-full'>
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='clothes'>Clothes</SelectItem>
                <SelectItem value='cosmic items'>Cosmic Items</SelectItem>
                <SelectItem value='toilet items'>Toilet Items</SelectItem>
                <SelectItem value='shoes'>Shoes</SelectItem>
            </SelectContent>
        </Select>
        {/* isFeatured */}
        <Select name='isFeatured'>
            <SelectTrigger className='w-full'>
                <SelectValue placeholder="Select Feature" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='true'>Featured</SelectItem>
                <SelectItem value='false'>Not Featured</SelectItem>
            </SelectContent>
        </Select>
      </div>
      <div className='grid grid-cols-2 gap-1'>
        <div className='w-full flex flex-col gap-2'>
            <Input type='text' placeholder='Product Brand' name='brand' />
            <div className="flex justify-between gap-2 flex-wrap">
                <Input type='file' name='image1' accept='image/*' />
                <Input type='file' name='image2' accept='image/*' />
            </div>
        </div>
        <Textarea className='h-full resize-none' placeholder='Product Description' />
      </div>
      <Button className='w-full'>Save</Button>
    </form>
  )
}

export default ProductForm
