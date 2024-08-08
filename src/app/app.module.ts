import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientComponent } from './client/client.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

import { ClientAddComponent } from './client-add/client-add.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClientComponent,
    ProductComponent,
    CategoryComponent,
    HomeComponent,
    ClientAddComponent,
    ClientEditComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    ProductAddComponent,
    ProductEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
