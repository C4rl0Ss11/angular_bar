import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../category/category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent implements OnInit {
  category: Category = { id: 0, name: '' };
  categoryId!: number;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['id'];
    this.loadCategory();
  }

  loadCategory(): void {
    this.categoryService.getCategoryById(this.categoryId).subscribe(
      (data: Category) => {
        this.category = data;
      },
      (error) => {
        console.error('Error al cargar categoría', error);
      }
    );
  }

  saveCategory(): void {
    this.categoryService
      .updateCategory(this.categoryId, this.category)
      .subscribe(
        (response) => {
          console.log('Categoría actualizada con éxito', response);
          this.router.navigate(['/categorias']);
        },
        (error) => {
          console.error('Error al actualizar categoría', error);
        }
      );
  }

  cancel(): void {
    this.router.navigate(['/categorias']);
  }
}
