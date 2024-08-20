import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleVenta } from '../detalleventa/detalleventa';

@Injectable({
  providedIn: 'root',
})
export class DetalleVentaService {
  private apiUrl = 'http://localhost:8080/api/detalle';

  constructor(private http: HttpClient) {}

  getAllDetalles(): Observable<DetalleVenta[]> {
    return this.http.get<DetalleVenta[]>(`${this.apiUrl}/findAll`);
  }

  getDetalleById(id: number): Observable<DetalleVenta> {
    return this.http.get<DetalleVenta>(`${this.apiUrl}/find/${id}`);
  }

  getDetalleByVentaId(ventaId: number): Observable<DetalleVenta[]> {
    return this.http.get<DetalleVenta[]>(
      `${this.apiUrl}/findByVenta/${ventaId}`
    );
  }

  addDetalle(detalle: DetalleVenta): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/save`, detalle, {
      responseType: 'text' as 'json',
    });
  }

  addMultipleDetalles(detalles: DetalleVenta[]): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/saveMultiple`, detalles, {
      responseType: 'text' as 'json',
    });
  }

  updateDetalle(id: number, detalle: DetalleVenta): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${id}`, detalle, {
      responseType: 'text' as 'json',
    });
  }

  deleteDetalle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
