export type ProductInfo = {
  slug: string;
  name: string;
  images: string[];
  stock: number;
  price: number;
  rating: number;
  numReviews: number;
  description: number;
  brand: null | string;
  isFeatured: boolean;
  category: string;
};
