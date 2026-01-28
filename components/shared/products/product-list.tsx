import React from "react";

function ProductList({ data, title }: { data: any; title?: string }) {
  console.log(data);
  return (
    <div>
      <div className="my-10">
        {title ? <h2 className="h2-bold mb-4">{title}</h2> : ""}
      </div>
      <div className="w-full grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((product: any) => (
          <h1 key={product.slug}>{product.name}</h1>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
