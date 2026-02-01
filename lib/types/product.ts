export type ProductInfo = {
    name:string,
    slug:string,
    category: string,
    description: string,
    images:string[],
    price: number,
    brand: null | string,
    rating: number,
    numReviews: number,
    stock: number,
    isFeatured: boolean,
    banner: null | string
}