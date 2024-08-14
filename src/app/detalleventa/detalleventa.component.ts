import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleVentaService } from '../services/detalleventa.service';
import { DetalleVenta } from './detalleventa'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-detalleventa',
  templateUrl: './detalleventa.component.html',
  styleUrls: ['./detalleventa.component.css'],
})
export class DetalleVentaComponent implements OnInit {
  detallesVenta: DetalleVenta[] = [];
  displayedColumns: string[] = [
    'id',
    'idVenta',
    'idProducto',
    'cantidad',
    'subtotal',
    'acciones',
  ];

  constructor(
    private detalleVentaService: DetalleVentaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.detalleVentaService.getAllDetalles().subscribe((data) => {
      this.detallesVenta = data;
    });
  }

  editDetalle(detalle: DetalleVenta): void {
    this.router.navigate(['/detalleventa/edit', detalle.id]);
  }

  deleteDetalle(detalleId: number): void {
    this.detalleVentaService.deleteDetalle(detalleId).subscribe(
      () => {
        this.detallesVenta = this.detallesVenta.filter(
          (detalle) => detalle.id !== detalleId
        );
        this.router.navigate(['/detalleventa']);
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }
}
