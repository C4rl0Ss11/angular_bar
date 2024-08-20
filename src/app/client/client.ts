export interface Client {
  id: number;
  name: string;
  last_name: string;
  email: string;
  ventaList: Venta[];
}

export interface Venta {
  id: number;
  fecha: string;
  total: number;
  estado: number;
}
