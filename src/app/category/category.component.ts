import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../category/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];
  categoriesImages: { [key: number]: string } = {};

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadCategoriesImages();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  loadCategoriesImages(): void {
    this.categoriesImages = {
      1: 'https://lacanasteria.com/wp-content/uploads/2021/08/temperatura-adobe-t.jpg',
      2: 'https://intikaypi.com/wp-content/uploads/2019/02/piqueo-intikaypi-1024x604.jpg',
      3: 'https://img.freepik.com/foto-gratis/surtido-trozos-tarta_114579-30727.jpg',
      4: 'https://barbusiness.es/wp-content/uploads/2018/03/Te%CC%81s-e-infusiones.jpg',
      5: 'https://www.shutterstock.com/image-photo/hamburger-potato-combo-staple-fast-600nw-2325787009.jpg',
      6: 'https://i.pinimg.com/736x/b1/20/f5/b120f54f7539846a33974a5de761be05.jpg',
    };
  }

  getCategoryImage(id: number): string {
    return (
      this.categoriesImages[id] ||
      'https://static.thenounproject.com/png/10943-200.png'
    );
  }

  editCategory(category: Category): void {
    this.router.navigate(['/categorias/edit', category.id]);
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.categories = this.categories.filter((cat) => cat.id !== id);
        this.router.navigate(['/categorias']);
      },
      (error) => {
        console.error('Error al eliminar categoría', error);
      }
    );
  }
}
