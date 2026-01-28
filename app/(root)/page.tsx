import ProductList from "@/components/shared/products/product-list";
import sampleData from "@/db/sample-data";

export default function Home() {
  const data = sampleData;
  return (
    <div>
      <ProductList
        data={sampleData.products}
        title="Newest Arrival"
        limit={4}
      />
    </div>
  );
}
