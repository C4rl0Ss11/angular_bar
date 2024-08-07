import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { Client } from '../client/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchText: string = '';
  displayedColumns: string[] = ['id', 'name', 'last_Name', 'email', 'actions'];

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe((data) => {
      this.clients = data;
      this.filteredClients = data;
    });
  }

  applyFilter(): void {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredClients = this.clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchTextLower) ||
        client.last_name.toLowerCase().includes(searchTextLower)
    );
  }
  editClient(client: Client): void {
    this.router.navigate(['/clientes/edit', client.id]);
  }

  deleteClient(clientId: number): void {
    this.clientService.deleteClient(clientId).subscribe(() => {
      this.clients = this.clients.filter((client) => client.id !== clientId);
      this.applyFilter();
    });
  }
}
