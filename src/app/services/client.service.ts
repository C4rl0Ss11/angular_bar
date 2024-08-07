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
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClientById(clientId: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${clientId}`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  updateClient(clientId: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${clientId}`, client);
  }

  deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${clientId}`);
  }
}
