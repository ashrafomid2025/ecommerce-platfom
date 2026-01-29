import Product from "@/components/shared/product/productList";
import { Button } from "@/components/ui/button";
import sampleData from "@/db/sampleData";
import Image from "next/image";

export default async function Home() {
  const data = sampleData;
  // await new Promise((resolve)=> setTimeout(resolve,3000));
  return (
    <div>
      <Product data={data.products} title="Newest Arrivals" limit={4} />
    </div>
  );
}
