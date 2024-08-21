import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { ProductService } from '../services/product.service';
import { VentaService } from '../services/venta.service';
import { DetalleVentaService } from '../services/detalleventa.service';
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
  venta: Venta = {
    id: 0,
    total: 0,
    estado: 1,
    client: {} as Client,
    detalleVentaList: [],
  };

  selectedProducts: SelectedProduct[] = [];
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchText: string = '';
  selectedClient: Client | null = null;

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchProductText: string = '';

  constructor(
    private ventaService: VentaService,
    private detalleVentaService: DetalleVentaService,
    private clientService: ClientService,
    private productService: ProductService
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
    this.venta.client = client;
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
    if (product.stock <= 0) {
      alert(`Este producto se encuentra sin stock.`);
      return;
    }

    const existingProduct = this.selectedProducts.find(
      (item) => item.product.id === product.id
    );

    if (existingProduct) {
      if (existingProduct.quantity < product.stock) {
        existingProduct.quantity += 1;
        existingProduct.subtotal =
          existingProduct.quantity * existingProduct.product.price;
      } else {
        alert(
          `Solo hay disponible ${product.stock} unidades de este producto.`
        );
      }
    } else {
      this.selectedProducts.push({
        product: product,
        quantity: 1,
        subtotal: product.price,
      });
    }
    this.updateTotal();
    this.searchProductText = '';
    this.filteredProducts = [];
  }

  updateSubtotal(item: SelectedProduct): void {
    if (item.quantity <= item.product.stock) {
      item.subtotal = item.quantity * item.product.price;
      this.updateTotal();
    } else {
      alert(
        `Solo hay disponible ${item.product.stock} unidades de este producto.`
      );
      item.quantity = item.product.stock;
      item.subtotal = item.quantity * item.product.price;
      this.updateTotal();
    }
  }

  removeProduct(item: SelectedProduct): void {
    this.selectedProducts = this.selectedProducts.filter(
      (selected) => selected !== item
    );
    this.updateTotal();
  }

  updateTotal(): void {
    this.venta.total = this.getTotal();
  }

  getTotal(): number {
    return this.selectedProducts.reduce((acc, item) => acc + item.subtotal, 0);
  }

  addVenta(): void {
    if (!this.selectedClient) {
      alert('Por favor, seleccione un cliente.');
      return;
    }

    const ventaToSave: Venta = {
      id: 0,
      total: this.getTotal(),
      estado: 1,
      client: this.selectedClient,
      detalleVentaList: [],
    };

    this.ventaService.addVenta(ventaToSave).subscribe(
      (response: string) => {
        console.log('Respuesta del servidor:', response);
        this.ventaService.getAllVentas().subscribe(
          (ventas: Venta[]) => {
            const lastVenta = ventas[ventas.length - 1];
            this.saveDetallesVenta(lastVenta);
          },
          (error) => this.handleError(error)
        );
      },
      (error) => this.handleError(error)
    );
  }

  saveDetallesVenta(venta: Venta): void {
    const ventaId = venta.id;

    const detalles: DetalleVenta[] = this.selectedProducts.map((item) => ({
      id: 0,
      subtotal: item.subtotal,
      cantidad: item.quantity,
      venta: { id: ventaId } as Venta,
      product: item.product,
    }));

    if (detalles.length > 1) {
      this.detalleVentaService.addMultipleDetalles(detalles).subscribe(
        (response: string) => {
          this.reduceStock(detalles);
          this.handleSuccess();
        },
        (error) => this.handleError(error)
      );
    } else if (detalles.length === 1) {
      this.detalleVentaService.addDetalle(detalles[0]).subscribe(
        (response: string) => {
          this.reduceStock(detalles);
          this.handleSuccess();
        },
        (error) => this.handleError(error)
      );
    }
  }

  reduceStock(detalles: DetalleVenta[]): void {
    detalles.forEach((detalle) => {
      const product = this.products.find((p) => p.id === detalle.product.id);
      if (product) {
        product.stock -= detalle.cantidad;
        this.productService.updateProduct(product.id, product).subscribe();
      }
    });
  }

  handleSuccess(): void {
    alert('Venta registrada exitosamente.');
    this.resetForm();
  }

  handleError(error: any): void {
    alert('Error al registrar la venta.');
    console.error('Error al registrar la venta', error);
  }

  resetForm(): void {
    this.venta = {
      id: 0,
      total: 0,
      estado: 1,
      client: {} as Client,
      detalleVentaList: [],
    };
    this.selectedProducts = [];
    this.searchText = '';
    this.searchProductText = '';
    this.filteredClients = [];
    this.filteredProducts = [];
    this.selectedClient = null;
  }
  //exeptions
  filterNegativeSign(event: any): void {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/-/g, '');
  }
}
