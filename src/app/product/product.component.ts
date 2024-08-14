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
      3: 'https://wongfood.vtexassets.com/arquivos/ids/380082/492072-01-8646.jpg?v=637356601892930000',
      4: 'https://img.freepik.com/fotos-premium/cabernet-sauvignon-uva-fondo-negro_776894-20095.jpg?w=740',
      5: 'https://vinoteca.gt/cdn/shop/products/Fortant_Merlot_704x704.jpg?v=1650382631',
      6: 'https://perufarma.com.pe/wp-content/uploads/2024/06/140102-Errazuriz_Aconcagua_Costa_Pinot_Noir.png',
      7: 'https://www.cocineroperuano.com/images/tequenos.JPG',
      8: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk15vNJu4Id0LXzGEbgZLrwIhfQa56-zL5MA&s',
      9: 'https://imgmedia.buenazo.pe/1200x660/buenazo/original/2021/06/03/60b96f4258c3d7084c543e2d.jpg',
      10:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8hh2Urkg-4A6iCoWZIxpT9MzFCRook-VRkw&s',
      11:'https://3.bp.blogspot.com/-TOjI4t-f64A/UO9gkng3okI/AAAAAAAAAfQ/3NdKHeCCzkY/s1600/eeeee.JPG',
      12: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOp_Al2jcWFx0hj4IfGXwgkvsADIYgId9OKw&s',
 13: 'https://storage.googleapis.com/eltiempo/1/2021/07/Como-preparar-un-mostrito-peruano.jpg',
      14: 'https://media-cdn.tripadvisor.com/media/photo-s/18/c2/0b/7e/pollo-broaster-con-papas.jpg',
      15: 'https://tofuu.getjusto.com/orioneat-prod/2P2Nvdjr78JBj2AqB-Promo%20Salchipapa%20de%20hot%20dog%20x2%20-%20La%20Cl%C3%A1sica.png',
      16: 'https://tofuu.getjusto.com/orioneat-local/resized2/TokWwJfJo3GXrrgcc-1200-1200.webp',
      17: 'https://cdn.cuponidad.pe/images/Deals/parrilla10-045.jpg',
      18: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFLU-9-VWX4eBDvc_gO41HSRMWRvOe2Fp-yQ&s'
      
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
