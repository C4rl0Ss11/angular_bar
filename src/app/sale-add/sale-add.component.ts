import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { ProductService } from '../services/product.service';
import { VentaService } from '../services/venta.service';
import { Client } from '../client/client';
import { Product } from '../product/product';
import { Venta } from '../venta/venta';
import { DetalleVenta } from '../detalleventa/detalleventa';

interface SelectedProduct {
  product: Product;
  quantity: number;
  subtotal: number;
}

@Component({
  selector: 'app-sale-add',
  templateUrl: './sale-add.component.html',
  styleUrls: ['./sale-add.component.css'],
})
export class SaleAddComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchText: string = '';
  selectedClient: Client | null = null;

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchProductText: string = '';

  selectedProducts: SelectedProduct[] = [];

  constructor(
    private clientService: ClientService,
    private productService: ProductService,
    private ventaService: VentaService
  ) {}

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe((data) => {
      this.clients = data;
    });

    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onSearchClient(): void {
    if (this.searchText.trim() === '') {
      this.filteredClients = [];
      return;
    }

    const searchTextLower = this.searchText.toLowerCase();
    this.filteredClients = this.clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchTextLower) ||
        client.last_name.toLowerCase().includes(searchTextLower)
    );
  }

  selectClient(client: Client): void {
    this.selectedClient = client;
    this.searchText = `${client.name} ${client.last_name}`;
    this.filteredClients = [];
  }

  onSearchProduct(): void {
    if (this.searchProductText.trim() === '') {
      this.filteredProducts = [];
      return;
    }

    const searchProductTextLower = this.searchProductText.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchProductTextLower)
    );
  }

  selectProduct(product: Product): void {
    const existingProduct = this.selectedProducts.find(
      (item) => item.product.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.subtotal =
        existingProduct.quantity * existingProduct.product.price;
    } else {
      this.selectedProducts.push({
        product: product,
        quantity: 1,
        subtotal: product.price,
      });
    }
    this.searchProductText = '';
    this.filteredProducts = [];
  }

  updateSubtotal(item: SelectedProduct): void {
    item.subtotal = item.quantity * item.product.price;
  }

  removeProduct(item: SelectedProduct): void {
    this.selectedProducts = this.selectedProducts.filter(
      (selected) => selected !== item
    );
  }

  getTotal(): number {
    return this.selectedProducts.reduce((acc, item) => acc + item.subtotal, 0);
  }

  addVenta(): void {
    if (!this.selectedClient) {
      alert('Por favor, seleccione un cliente.');
      return;
    }

    const venta: Venta = {
      idVenta: 0,
      fecha: new Date().toISOString().split('T')[0],
      total: this.getTotal(),
      idCliente: this.selectedClient.id,
      estado: 1,
    };

    this.ventaService.addVenta(venta).subscribe(
      (response: Venta) => {
        const ventaId = response.idVenta;

        if (ventaId) {
          this.selectedProducts.forEach((item) => {
            const detalle: DetalleVenta = {
              id: 0,
              idVenta: ventaId,
              idProducto: item.product.id,
              cantidad: item.quantity,
              subtotal: item.subtotal,
            };

            this.ventaService.addDetalleVenta(detalle).subscribe(
              () => {},
              (error) => {
                console.error('Error al agregar detalles de venta:', error);
              }
            );
          });

          this.selectedProducts = [];
          this.selectedClient = null;
          this.searchText = '';
          this.searchProductText = '';
        } else {
          alert('Error al registrar la venta.');
        }
      },
      (error) => {
        console.error('Error al agregar venta:', error);
      }
    );
  }
}
