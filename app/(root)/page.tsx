import ProductList from '@/components/shared/Product/ProductList'
import sampleData from '@/db/sample-data'
async function page() {
  // await new Promise(resolve=> setTimeout(resolve,3000));
  const data =  sampleData ;
  return (
    <div>
      <ProductList data={data.products} title="Newest Arrival" />
    </div>
  )
}

export default page