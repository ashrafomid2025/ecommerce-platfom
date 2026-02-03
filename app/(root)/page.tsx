import ProductList from '@/components/shared/Product/ProductList'
import sampleData from '@/db/sample-data'
import { getLatestProduct } from '@/lib/action/product.action'
async function page() {
  // await new Promise(resolve=> setTimeout(resolve,3000));
  // const data =  sampleData ;
  const data = await getLatestProduct()
  return (
    <div>
      <ProductList data={data} title="Newest Arrival"  />
    </div>
  )
}

export default page