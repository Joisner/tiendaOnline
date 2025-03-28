import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonImg,
  ToastController
} from '@ionic/angular/standalone';
import { ProductService, Product } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonBackButton,
    IonSpinner,
    IonImg
  ]
})
export class ProductDetailPage implements OnInit {
  product: Product | undefined;
  isLoading = true;
  isAddingToCart = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
  }

  private loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  async addToCart() {
    if (!this.product || this.isAddingToCart) return;

    this.isAddingToCart = true;

    try {
      await this.cartService.addToCart(this.product);
      const toast = await this.toastController.create({
        message: 'Producto agregado al carrito',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      await toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al agregar al carrito',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      await toast.present();
    } finally {
      this.isAddingToCart = false;
    }
  }
}