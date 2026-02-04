import ProductList from "@/components/shared/products/product-list";
import { getLatestProducts } from "@/lib/action/product.action";
import { ProductInfo } from "@/types";

export default async function Home() {
  const data = await getLatestProducts();
  return (
    <div>
      <ProductList data={data} title="Newest Arrival" />
    </div>
  );
}
