import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Product } from '../product/product';
import { Category } from '../category/category';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    stock: 0,
    maker: { id: 0, name: '' },
  };
  categories: Category[] = [];
  productId!: number;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.loadProduct();
    this.loadCategories();
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe(
      (data: Product) => {
        this.product = data;
      },
      (error) => {
        console.error('Error al cargar producto', error);
      }
    );
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

  updateProduct(): void {
    this.productService.updateProduct(this.productId, this.product).subscribe(
      (response) => {
        console.log('Producto actualizado con éxito', response);
        this.router.navigate(['/productos']);
      },
      (error) => {
        console.error('Error al actualizar producto', error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/productos']);
  }
}
