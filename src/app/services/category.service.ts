import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../category/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/maker';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/findAll`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/find/${id}`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/save`, category);
  }

  updateCategory(id: number, category: Category): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, category, {
      responseType: 'text',
    });
  }

  deleteCategory(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      observe: 'response',
      responseType: 'text',
    });
  }
}
