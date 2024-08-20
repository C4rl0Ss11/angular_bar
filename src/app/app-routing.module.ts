import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientAddComponent } from './client-add/client-add.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { VentaComponent } from './venta/venta.component';
import { DetalleVentaComponent } from './detalleventa/detalleventa.component';
import { SaleAddComponent } from './sale-add/sale-add.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'clientes', component: ClientComponent },
  { path: 'clientes/add', component: ClientAddComponent },
  { path: 'clientes/edit/:id', component: ClientEditComponent },
  { path: 'productos', component: ProductComponent },
  { path: 'productos/add', component: ProductAddComponent },
  { path: 'productos/edit/:id', component: ProductEditComponent },
  { path: 'categorias', component: CategoryComponent },
  { path: 'categorias/add', component: CategoryAddComponent },
  { path: 'categorias/edit/:id', component: CategoryEditComponent },
  { path: 'ventas', component: VentaComponent },
  { path: 'ventas/add', component: SaleAddComponent },
  { path: 'detalleventa/:id', component: DetalleVentaComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
