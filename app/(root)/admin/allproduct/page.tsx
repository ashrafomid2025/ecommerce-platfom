import SearchForm from "@/components/shared/products/search-form";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { searchProduct } from "@/lib/action/product.action";
import { prisma } from "@/lib/db/lib";
import Image from "next/image";

export default async function AllProductPage() {
  const products = await prisma.product.findMany();
  const serializeProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
  }));
  return (
    <div className="w-full p-4">
      <SearchForm
        initialProducts={serializeProducts}
        searchTerm={searchProduct}
      />
    </div>
  );
}
