import sampleData from '@/db/sample-data';
import { prisma } from '@/lib/db/lib'
import React from 'react'

async function Seed() {
    await prisma.ecommerePlatform.deleteMany();
    await prisma.user.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.ecommerePlatform.createMany({data: sampleData.products})
    await prisma.user.createMany({
      data: sampleData.users,
    })
    console.log('deta seeded');
  return (
    <div>seeded data</div>
  )
}

export default Seed