import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante, CrearEstudianteDto } from '../../shared/models/estudiante.model';
import { environment } from '../../../environments';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private apiUrl = environment.urlBase;

  constructor(private http: HttpClient) { }

  // Crear estudiante
  crear(dto: CrearEstudianteDto): Observable<Estudiante> {
    return this.http.post<Estudiante>(`${this.apiUrl}${environment.apiEstudiantes}`, dto);
  }
}
