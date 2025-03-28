import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { 
  IonButton, 
  IonButtons, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonCol, 
  IonContent, 
  IonGrid, 
  IonHeader, 
  IonIcon, 
  IonImg, 
  IonRefresher, 
  IonRefresherContent, 
  IonRow, 
  IonSpinner, 
  IonTitle, 
  IonToolbar, 
  ToastController 
} from '@ionic/angular/standalone';
import { ProductService, Product } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { addIcons } from 'ionicons';
import { cartOutline, personOutline, addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonRefresher,
    IonRefresherContent,
    IonRow,
    IonSpinner,
    IonTitle,
    IonToolbar
  ]
})
export class ProductsPage implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = true;
  newProducts: Product[] = [
    {
      id: 4,
      title: "Smart Watch Pro",
      price: 249.99,
      description: "Smartwatch avanzado con múltiples funciones de salud",
      image: "https://m.media-amazon.com/images/I/71pbEc1KO3L.jpg",
      category: "Electrónicos"
    },
    {
      id: 5,
      title: "Altavoz Bluetooth",
      price: 129.99,
      description: "Altavoz portátil con sonido de alta calidad",
      image: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCO/122488748_01/w=800,h=800,fit=pad",
      category: "Accesorios"
    }
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastCtrl: ToastController
  ) {
    addIcons({
      'cart-outline': cartOutline,
      'person-outline': personOutline,
      'add-outline': addOutline
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        // Combine existing and new products
        this.products = [...data, ...this.newProducts];
        this.filteredProducts = this.products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos', error);
        this.isLoading = false;
        this.showErrorToast('No se pudieron cargar los productos');
      }
    });
  }

  async addToCart(product: Product) {
    try {
      await this.cartService.addToCart(product);
      const toast = await this.toastCtrl.create({
        message: `${product.title} añadido al carrito`,
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      await toast.present();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Error al agregar al carrito',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      await toast.present();
    }
  }

  async refreshProducts(event: any) {
    try {
      this.loadProducts();
      event.target.complete();
    } catch (error) {
      this.showErrorToast('Error al actualizar productos');
      event.target.complete();
    }
  }

  private async showErrorToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'bottom'
    });
    await toast.present();
  }
}