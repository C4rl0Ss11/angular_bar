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
      3: 'https://brasaycarbon.pe/wp-content/uploads/2020/12/promo1.jpg'
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
