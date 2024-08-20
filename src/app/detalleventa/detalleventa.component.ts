import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleVentaService } from '../services/detalleventa.service';
import { DetalleVenta } from '../detalleventa/detalleventa';

@Component({
  selector: 'app-detalleventa',
  templateUrl: './detalleventa.component.html',
  styleUrls: ['./detalleventa.component.css'],
})
export class DetalleVentaComponent implements OnInit {
  detalles: DetalleVenta[] = [];

  constructor(
    private route: ActivatedRoute,
    private detalleVentaService: DetalleVentaService
  ) {}

  ngOnInit(): void {
    const ventaId = this.route.snapshot.paramMap.get('id');
    if (ventaId) {
      this.getDetallesByVentaId(+ventaId);
    }
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
