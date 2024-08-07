import { Component, OnInit } from '@angular/core';
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

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  editCategory(category: Category): void {
    console.log('Edit category', category);
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter((cat) => cat.id !== id);
    });
  }
}
