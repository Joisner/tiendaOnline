import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonAvatar,
  ToastController
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import { 
  personOutline,
  receiptOutline,
  settingsOutline,
  helpCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonAvatar
  ]
})
export class ProfilePage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    addIcons({
      'person-outline': personOutline,
      'receipt-outline': receiptOutline,
      'settings-outline': settingsOutline,
      'help-circle-outline': helpCircleOutline
    });
  }

  ngOnInit() {}

  async editProfile() {
    await this.showFeatureMessage('Editar perfil');
  }

  async viewOrders() {
    await this.showFeatureMessage('Ver pedidos');
  }

  async openSettings() {
    await this.showFeatureMessage('Configuración');
  }

  async showHelp() {
    await this.showFeatureMessage('Ayuda');
  }

  async logout() {
    await this.authService.logout();
    await this.router.navigate(['/login'], { replaceUrl: true });
  }

  private async showFeatureMessage(feature: string) {
    const toast = await this.toastController.create({
      message: `Función "${feature}" en desarrollo`,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}