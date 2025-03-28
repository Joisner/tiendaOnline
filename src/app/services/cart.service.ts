import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  async addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems = [...this.cartItems];
    } else {
      this.cartItems = [...this.cartItems, { ...product, quantity: 1 }];
    }
    
    this.updateCart();
  }

  async removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCart();
  }

  async updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartItems = [...this.cartItems];
      this.updateCart();
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  private updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }
}