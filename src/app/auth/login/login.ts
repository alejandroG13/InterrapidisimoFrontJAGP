import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  templateUrl: './login.html'
})
export class LoginComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();

      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Todos los campos son obligatorios y el email debe ser válido',
        confirmButtonText: 'Aceptar'
      });

      return;
    }

    const { usuario, password } = this.form.value;

    this.authService.login(usuario, password).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          text: 'Bienvenido',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });

        this.router.navigate(['/inscripciones']);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Usuario o contraseña incorrectos',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
