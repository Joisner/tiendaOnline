import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadComponent: () => import('./products/products.page').then(m => m.ProductsPage)
  },
  {
    path: 'product-detail/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./product-detail/product-detail.page').then(m => m.ProductDetailPage)
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    loadComponent: () => import('./cart/cart.page').then(m => m.CartPage)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];