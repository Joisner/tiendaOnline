import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isLoggedInSubject.next(isLoggedIn);
  }

  async login(email: string, password: string): Promise<void> {
    if (email === 'test@test.com' && password === '123456') {
      localStorage.setItem('isLoggedIn', 'true');
      this.isLoggedInSubject.next(true);
    } else {
      throw new Error('Credenciales inválidas');
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedInSubject.next(false);
  }

  async isAuthenticated(): Promise<boolean> {
    return this.isLoggedInSubject.value;
  }
}

