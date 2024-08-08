import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Product } from '../product/product';
import { Category } from '../category/category';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    stock: 0,
    maker: { id: 0, name: '' },
  };
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error al cargar categorías', error);
      }
    );
  }

  addProduct(): void {
    this.productService.addProduct(this.product).subscribe(
      (response) => {
        console.log('Producto agregado con éxito', response);
        this.router.navigate(['/productos']);
      },
      (error) => {
        console.error('Error al agregar producto', error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/productos']);
  }
}
