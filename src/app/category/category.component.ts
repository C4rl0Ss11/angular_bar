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

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
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
