import { auth } from "@/auth";
import SearchForm from "@/components/shared/products/search-form";
import { searchProduct } from "@/lib/action/product.action";

import { prisma } from "@/lib/db/lib";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function AllProductPage() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });
  const products = await prisma.product.findMany();
  const serializeProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
  }));
  if (user?.role === "admin") {
    return (
      <div className="w-full p-4">
        <SearchForm initialValue={serializeProducts} action={searchProduct} />
      </div>
    );
  } else {
    return redirect("/");
  }
}
