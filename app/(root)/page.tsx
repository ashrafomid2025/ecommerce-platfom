import Products from "@/components/shared/product/productList";
import { Button } from "@/components/ui/button";
import { getLatestProducts } from "@/lib/actions/products.actions";
import { prisma } from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  const data = await getLatestProducts();
  return (
    <div>
      <Products data={data} title="Newest Arrival" />
    </div>
  );
}
