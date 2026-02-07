import React from "react";
import Product from "./product";
import { ProductInfo } from "@/types";

function ProductList({ data, title }: { data: any; title?: string }) {
  return (
    <div>
      <div className="mt-6">
        {title ? <h2 className="h2-bold mb-4">{title}</h2> : ""}
      </div>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((product: ProductInfo) => (
            <Product key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p>No product exists yet</p>
      )}
    </div>
  );
}

export default ProductList;
