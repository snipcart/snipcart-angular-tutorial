import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './core/product';
import { PRODUCTS } from './mock-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Product[] {
    return PRODUCTS;
  }

  getProduct(id: number): Observable<Product | undefined> {
   const product = PRODUCTS.find(product => product.id === id);
   return of(product);
  }
}
