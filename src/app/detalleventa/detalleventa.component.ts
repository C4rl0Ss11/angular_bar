import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleVentaService } from '../services/detalleventa.service';
import { DetalleVenta } from '../detalleventa/detalleventa';
import { Venta } from '../venta/venta';
import { VentaService } from '../services/venta.service';

@Component({
  selector: 'app-detalleventa',
  templateUrl: './detalleventa.component.html',
  styleUrls: ['./detalleventa.component.css'],
})
export class DetalleVentaComponent implements OnInit {
  detalles: DetalleVenta[] = [];
  venta: Venta | null = null;

  constructor(
    private route: ActivatedRoute,
    private detalleVentaService: DetalleVentaService,
    private ventaService: VentaService
  ) {}

  ngOnInit(): void {
    const ventaId = this.route.snapshot.paramMap.get('id');
    if (ventaId) {
      this.getVentaById(+ventaId);
      this.getDetallesByVentaId(+ventaId);
    }
  }

  getVentaById(ventaId: number): void {
    this.ventaService.getVentaById(ventaId).subscribe(
      (data) => {
        this.venta = data;
      },
      (error) => {
        console.error('Error al obtener la venta', error);
      }
    );
  }
  getDetallesByVentaId(ventaId: number): void {
    this.detalleVentaService.getAllDetalles().subscribe(
      (data) => {
        this.detalles = data.filter((detalle) => detalle.venta.id === ventaId);
      },
      (error) => {
        console.error('Error al obtener los detalles de la venta', error);
      }
    );
  }
}
