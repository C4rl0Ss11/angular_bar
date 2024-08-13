import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleVentaService } from '../services/detalleventa.service'; 
import { DetalleVenta } from './detalleventa';


@Component({
  selector: 'app-detalleventa',
  templateUrl: './detalleventa.component.html',
  styleUrl: './detalleventa.component.css'
})
export class DetalleVentaComponent implements OnInit {
  detallesVenta: DetalleVenta[] = [];
  filteredDetalles: DetalleVenta[] = [];
  searchText: string = '';
  displayedColumns: string[] = ['id', 'idVenta', 'idProducto', 'cantidad', 'subtotal', 'actions'];

  constructor(private detalleVentaService: DetalleVentaService, private router: Router) {}

  ngOnInit(): void {
    this.detalleVentaService.getAllDetalles().subscribe((data) => {
      this.detallesVenta = data;
      this.filteredDetalles = data;
    });
  }

  applyFilter(): void {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredDetalles = this.detallesVenta.filter(
      (detalle) =>
        detalle.id.toString().includes(searchTextLower) ||
        detalle.idVenta.toString().includes(searchTextLower) ||
        detalle.idProducto.toString().includes(searchTextLower) ||
        detalle.cantidad.toString().includes(searchTextLower) ||
        detalle.subtotal.toString().includes(searchTextLower)
    );
  }

  editDetalle(detalle: DetalleVenta): void {
    this.router.navigate(['/detalleventa/edit', detalle.id]);
  }

  deleteDetalle(detalleId: number): void {
    this.detalleVentaService.deleteDetalle(detalleId).subscribe(() => {
      this.detallesVenta = this.detallesVenta.filter((detalle) => detalle.id !== detalleId);
      this.applyFilter();
    });
  }
}

