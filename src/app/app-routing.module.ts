import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientAddComponent } from './client-add/client-add.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'clientes', component: ClientComponent },
  { path: 'clientes/add', component: ClientAddComponent },
  { path: 'clientes/edit/:id', component: ClientEditComponent },
  { path: 'productos', component: ProductComponent },
  { path: 'categorias', component: CategoryComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
