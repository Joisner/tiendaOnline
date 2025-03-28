import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ReactiveFormsModule, 
  FormsModule,
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonicModule, 
  ToastController 
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { cartOutline, personOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    IonicModule
  ]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    addIcons({
      'cart-outline': cartOutline,
      'person-outline': personOutline
    });
  }

  ngOnInit() {
    this.initForm();
    // Pre-fill the form with test credentials
    this.loginForm.patchValue({
      email: 'test@test.com',
      password: '123456'
    });
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    if (this.isLoading) return;

    this.isLoading = true;

    try {
      const { email, password } = this.loginForm.value;
      await this.authService.login(email.trim(), password.trim());
      await this.router.navigate(['/products'], { replaceUrl: true });
    } catch (error) {
      await this.showErrorToast('Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      this.isLoading = false;
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}