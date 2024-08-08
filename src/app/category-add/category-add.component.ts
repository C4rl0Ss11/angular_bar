import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css'],
})
export class CategoryAddComponent {
  category: any = {};

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.categoryService.addCategory(this.category).subscribe(
      () => this.router.navigate(['/categorias']),
      (error) => console.error('Error al agregar categoria', error)
    );
  }
}
