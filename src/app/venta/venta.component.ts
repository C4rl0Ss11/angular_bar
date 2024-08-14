import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentaService } from '../services/venta.service';
import { Venta } from '../venta/venta';
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.css',
})
export class VentaComponent implements OnInit {
  ventas: Venta[] = [];
  displayedColumns: string[] = [
    'id_Venta',
    'fecha',
    'total',
    'id_Cliente',
    'estado',
    'acciones',
  ];

  constructor(private ventaService: VentaService, private router: Router) {}

  ngOnInit(): void {
    this.ventaService.getAllVentas().subscribe((data) => {
      this.ventas = data;
    });
  }

  editVenta(venta: Venta): void {
    this.router.navigate(['/ventas/edit', venta.idVenta]);
  }

  deleteVenta(ventaId: number): void {
    this.ventaService.deleteVenta(ventaId).subscribe(
      () => {
        this.ventas = this.ventas.filter((venta) => venta.idVenta !== ventaId);
        this.router.navigate(['/ventas']);
      },
      (error) => {
        console.error('Error al eliminar venta', error);
      }
    );
  }
}
