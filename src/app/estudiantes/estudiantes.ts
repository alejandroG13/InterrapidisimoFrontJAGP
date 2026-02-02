import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { EstudianteService } from '../core/services/estudiantes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './estudiantes.html'
})
export class EstudiantesComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    }, { validators: this.passwordsIguales });
  }

  // Validator para que password y confirmarPassword sean iguales
  passwordsIguales(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmarPassword')?.value;

    if (pass !== confirm) {
      group.get('confirmarPassword')?.setErrors({ passwordsNoCoinciden: true });
    } else {
      const errors = group.get('confirmarPassword')?.errors;
      if (errors) {
        delete errors['passwordsNoCoinciden'];
        if (Object.keys(errors).length === 0) {
          group.get('confirmarPassword')?.setErrors(null);
        } else {
          group.get('confirmarPassword')?.setErrors(errors);
        }
      }
    }
    return null;
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.estudianteService.crear(this.form.value).subscribe({
      next: () => {
        this.snack.open('Estudiante creado con éxito', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.snack.open('Error al crear estudiante', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
