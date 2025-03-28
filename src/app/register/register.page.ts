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
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    IonicModule
  ]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (this.isLoading) return;

    this.isLoading = true;

    try {
      // Simular registro exitoso
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.showSuccessToast('Registro exitoso');
      this.router.navigate(['/login']);
    } catch (error) {
      await this.showErrorToast('Error al registrarse. Intente nuevamente.');
    } finally {
      this.isLoading = false;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
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

  async showSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.registerForm.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}