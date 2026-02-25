import { auth } from "@/auth";
import ProductForm from "@/components/shared/products/insert-form";
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
        <div>
          <ProductForm />
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
