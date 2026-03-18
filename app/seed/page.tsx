import sampleData from "@/db/sample-data";
import { prisma } from "@/lib/db";
import React from "react";

async function page() {
  await prisma.products.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.products.createMany({
    data: sampleData.products,
  });

  await prisma.user.createMany({
    data: sampleData.users,
  });
  return <div>seeding the data</div>;
}

export default page;
