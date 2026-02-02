import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then(m => m.LoginComponent),

  },
  {
    path: 'crear_estudiante',
    loadComponent: () =>
      import('./estudiantes/estudiantes').then(m => m.EstudiantesComponent),
  },
  {
    path: 'inscripciones',
    loadComponent: () =>
      import('./inscripciones/inscripciones').then(m => m.InscripcionesComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
