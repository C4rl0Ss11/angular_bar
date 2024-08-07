export interface Maker {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  maker: Maker;
}
