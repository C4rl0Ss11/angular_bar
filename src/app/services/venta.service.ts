import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../venta/venta';
import { DetalleVenta } from '../detalleventa/detalleventa';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private apiUrl = 'http://localhost:8080/api/venta';

  constructor(private http: HttpClient) {}

  getAllVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.apiUrl}/findAll`);
  }

  getVentaById(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}/find/${id}`);
  }

  addVenta(venta: Venta): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/save`, venta, {
      responseType: 'text' as 'json',
    });
  }

  updateVenta(id: number, venta: Venta): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${id}`, venta, {
      responseType: 'text' as 'json',
    });
  }

  deleteVenta(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}
