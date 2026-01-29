import React from "react";
import Product from "./product";

function ProductList({
  data,
  title,
  limit,
}: {
  data: any;
  title?: string;
  limit?: number;
}) {
  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div>
      <div className="mt-6">
        {title ? <h2 className="h2-bold mb-4">{title}</h2> : ""}
      </div>
      {limitedData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limitedData.map((product: any) => (
            <Product key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p>No product exist</p>
      )}
    </div>
  );
}

export default ProductList;
