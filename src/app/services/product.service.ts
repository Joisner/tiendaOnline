import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      title: "Laptop Pro X",
      price: 999.99,
      description: "Potente laptop con las últimas especificaciones",
      image: "https://www.apple.com/newsroom/images/product/mac/standard/Apple_16-inch-MacBook-Pro_111319_big.jpg.large.jpg",
      category: "Electrónicos"
    },
    {
      id: 2,
      title: "Smartphone Ultra",
      price: 699.99,
      description: "Smartphone de última generación con cámara profesional",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      category: "Electrónicos"
    },
    {
      id: 3,
      title: "Auriculares Premium",
      price: 199.99,
      description: "Auriculares inalámbricos con cancelación de ruido",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      category: "Accesorios"
    }
  ];

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(this.products).pipe(delay(500));
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product).pipe(delay(300));
  }
}