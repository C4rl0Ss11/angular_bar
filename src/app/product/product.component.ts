import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../product/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  editProduct(product: Product): void {
    //*
    console.log('Edit product', product);
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter(
        (product) => product.id !== productId
      );
    });
  }
}
