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
import { prisma } from "@/lib/db/lib";
import Image from "next/image";

export default async function AllProductPage() {
  const products = await prisma.product.findMany();
  return (
    <div className="w-full p-4">
      <SearchForm />
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-black px-2 text-center text-white">
            <TableRow className="text-center text-white">
              <TableHead className="text-white px-2">Name</TableHead>
              <TableHead className="text-white px-2">Brand</TableHead>
              <TableHead className="text-white px-2">Price</TableHead>
              <TableHead className="text-white px-2">Image</TableHead>
              <TableHead className="text-white px-2" colSpan={2}>
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow className="even:bg-gray-200 " key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.price.toString()}</TableCell>
                <TableCell>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    height={100}
                    width={100}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="destructive">Delete</Button>
                </TableCell>
                <TableCell>
                  <Button variant="outline">Update</Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell>{products.length}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
