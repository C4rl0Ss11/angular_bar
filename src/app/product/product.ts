export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  maker: {
    id: number;
    name: string;
  };
}
