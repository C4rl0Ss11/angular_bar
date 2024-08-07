import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/product/findAll';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(productId: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${productId}`, product);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
}
