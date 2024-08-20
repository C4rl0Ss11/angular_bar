import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../client/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/api/v1/clients';

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/findAll`);
  }

  getClientById(clientId: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/find/${clientId}`);
  }

  addClient(client: Client): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/save`, client, {
      responseType: 'text' as 'json',
    });
  }

  updateClient(clientId: number, client: Client): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${clientId}`, client, {
      responseType: 'text' as 'json',
    });
  }

  deleteClient(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}
