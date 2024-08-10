import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../product/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  productImages: { [key: number]: string } = {};

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadProductImages();
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

  loadProductImages(): void {
    this.productImages = {
      1: 'https://c.pxhere.com/photos/a2/9a/wine_red_wine_glass_drink_alcohol_benefit_from_wine_glass_red-921766.jpg!d',
      2: 'https://www.shutterstock.com/image-photo/bottle-chilled-white-wine-two-600nw-2479134003.jpg',
      3: 'https://www.cocineroperuano.com/images/tequenos.JPG',
      4: 'https://i0.wp.com/www.pasionthermomix.co/wp-content/uploads/2019/03/choco-chocolate.jpg?fit=768%2C480&ssl=1',
      5: 'https://www.cafescandelas.com/uploads/thumbnail/Ingredientes_del_te_rojo_620X339_s136.jpg?umk=ff4958b03c49b2852a3fe4e3c4dac5dfe749d326',
      6: 'https://media.istockphoto.com/id/487328697/es/foto/infusi%C3%B3n-de-manzanilla.jpg?s=612x612&w=0&k=20&c=I6HBVmXbuaHt6a_B2ueE2JXVm17uOoa_91D8EQ1gM4A=',
      7: 'https://comidasperuanas.com.pe/wp-content/uploads/2023/05/arroz_chaufa_2.jpg',
      8: 'https://www.mdzol.com/u/fotografias/m/2021/12/2/f1280x720-1145523_1277198_5050.png',
    };
  }

  getProductImage(productId: number): string {
    return (
      this.productImages[productId] ||
      'https://static.thenounproject.com/png/10943-200.png'
    );
  }

  editProduct(product: Product): void {
    this.router.navigate(['/productos/edit', product.id]);
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter(
        (product) => product.id !== productId
      );
    });
  }
}
