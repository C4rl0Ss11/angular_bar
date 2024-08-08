import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/findAll`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/find/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/save`, product);
  }

  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, product, {
      responseType: 'text',
    });
  }

  deleteProduct(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      observe: 'response',
      responseType: 'text',
    });
  }
}
