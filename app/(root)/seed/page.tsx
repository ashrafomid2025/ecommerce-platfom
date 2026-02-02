import sampleData from "@/db/sample-data";
import { prisma } from "@/lib/db/lib";
import React from "react";

async function Page() {
  async function seed() {
    await prisma.product.deleteMany();
    await prisma.product.createMany({ data: sampleData.products });
    console.log("Database seeded successfully");
  }
  seed();
  return <div>Hi</div>;
}

export default Page;
