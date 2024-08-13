import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleVenta } from '../detalleventa/detalleventa';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {
  private apiUrl = 'http://localhost:8080/api/detalleventa';

  constructor(private http: HttpClient) {}

  
  getAllDetalles(): Observable<DetalleVenta[]> {
    return this.http.get<DetalleVenta[]>(this.apiUrl);
  }

  
  getDetalleById(id: number): Observable<DetalleVenta> {
    return this.http.get<DetalleVenta>(`${this.apiUrl}/${id}`);
  }

  
  addDetalle(detalle: DetalleVenta): Observable<DetalleVenta> {
    return this.http.post<DetalleVenta>(this.apiUrl, detalle);
  }

  
  updateDetalle(id: number, detalle: DetalleVenta): Observable<DetalleVenta> {
    return this.http.put<DetalleVenta>(`${this.apiUrl}/${id}`, detalle);
  }

  
  deleteDetalle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
