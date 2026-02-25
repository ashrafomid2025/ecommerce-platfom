import { auth } from "@/auth";
import ProductForm from "@/components/shared/products/product-form";

import { prisma } from "@/lib/db/lib";
import { redirect } from "next/navigation";
import React from "react";

async function InsertPage() {
  const session = await auth();
  if (session) {
    const id = session.user?.id;
    const user = await prisma.user.findFirst({
      where: { id: id },
    });
    if (user?.role === "admin") {
      return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 border p-2 rounded-md shadow-2xs gap-1">
          <div className="relative col-span-1 flex flex-col items-center">
            {/* <h1 className="font-bold absolute top-4 left-1/2 -translate-x-1/2 text-center">
              Add Product
            </h1> */}
            <h1 className="leading-none font-bold text-3xl">Add Product</h1>
            <p className="text-muted-foreground text-sm">
              products that worth sharing, attract customers
            </p>
            <img
              className="object-cover w-full h-full"
              src="/images/p-banner.png"
              alt="banner image"
            />
          </div>
          <div className="col-span-2">
            {/* form */}

            <ProductForm />
          </div>
        </div>
      );
    } else {
      return redirect("/");
    }
  } else {
    return redirect("/sign-in");
  }
}

export default InsertPage;
