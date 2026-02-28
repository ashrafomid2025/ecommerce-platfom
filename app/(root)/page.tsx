import Hero from "@/components/Hero";
import Products from "@/components/shared/product/productList";
import { Button } from "@/components/ui/button";
import { getLatestProducts } from "@/lib/actions/products.actions";
import { prisma } from "@/lib/db";
import { ProductInfo } from "@/types/product";
import Image from "next/image";

export default async function Home() {
  const data = await getLatestProducts();
  return (
    <div>
      <Hero />
      <Products data={data} title="Newest Arrival" />
    </div>
  );
}
