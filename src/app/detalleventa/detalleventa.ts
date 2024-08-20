import { Product } from '../product/product';
import { Venta } from '../venta/venta';

export interface DetalleVenta {
  id?: number;
  subtotal: number;
  cantidad: number;
  venta: { id: number };
  product: Product;
}
