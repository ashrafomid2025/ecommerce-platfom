import sampleData from "@/db/sample-data";
import { prisma } from "@/lib/db/lib";
import React from "react";

async function Seed() {
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.createMany({
    data: sampleData.products,
  });
  await prisma.user.createMany({
    data: sampleData.users,
  });
  return <div>Seeding the data</div>;
}

export default Seed;
