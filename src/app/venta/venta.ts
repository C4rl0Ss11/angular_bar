import { Client } from '../client/client';
import { DetalleVenta } from '../detalleventa/detalleventa';

export interface Venta {
  id: number;
  fecha?: string;
  total: number;
  estado: number;
  client: Client;
  detalleVentaList: DetalleVenta[];
}
