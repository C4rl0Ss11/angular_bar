import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { Client } from '../client/client';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css'],
})
export class ClientEditComponent implements OnInit {
  client: Client = { id: 0, name: '', last_name: '', email: '' };

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.clientService.getClientById(id).subscribe((data) => {
      this.client = data;
    });
  }

  saveClient(): void {
    this.clientService
      .updateClient(this.client.id, this.client)
      .subscribe(() => {
        this.router.navigate(['/clientes']);
      });
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }
}
