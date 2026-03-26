export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  description: string | null;
  image: string | null;
  is_active: boolean;
};