import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentaService } from '../services/venta.service';
import { Venta } from '../venta/venta';
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css'
})
export class VentaComponent implements OnInit {
  ventas: Venta[] = [];
  filteredVentas: Venta[] = [];
  searchText: string = '';
  displayedColumns: string[] = ['idVenta', 'fecha', 'total', 'idCliente', 'estado', 'actions'];

  constructor(private ventaService: VentaService, private router: Router) {}

  ngOnInit(): void {
    this.ventaService.getAllVentas().subscribe((data) => {
      this.ventas = data;
      this.filteredVentas = data;
    });
  }

  applyFilter(): void {
    const searchTextLower = this.searchText.toLowerCase();
    this.filteredVentas = this.ventas.filter(
      (venta) =>
        venta.idVenta.toString().includes(searchTextLower) ||
        venta.fecha.toLowerCase().includes(searchTextLower) ||
        venta.total.toString().includes(searchTextLower) ||
        venta.idCliente.toString().includes(searchTextLower) ||
        venta.estado.toString().includes(searchTextLower)
    );
  }

  editVenta(venta: Venta): void {
    this.router.navigate(['/ventas/edit', venta.idVenta]);
  }

  deleteVenta(ventaId: number): void {
    this.ventaService.deleteVenta(ventaId).subscribe(() => {
      this.ventas = this.ventas.filter((venta) => venta.idVenta !== ventaId);
      this.applyFilter();
    });
  }
}

