import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InscDetalle } from '../../shared/models/inscripciones.model';
import { environment } from '../../../environments';
import { ApiMessageResponse } from '../../shared/models/api.model';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  private apiUrl = environment.urlBase;

  constructor(private http: HttpClient) { }

  // Listado de materias con estudiantes inscritos
  obtenerMateriasConCupo(): Observable<InscDetalle[]> {
    return this.http.get<InscDetalle[]>(
      `${this.apiUrl}${environment.apiInscripcionesMateria}`
    );
  }

  // Inscribir materias
  inscribirMaterias(materias: number[]): Observable<ApiMessageResponse> {
    return this.http.post<ApiMessageResponse>(
      `${this.apiUrl}${environment.apiInscripciones}`,
      {
        materias
      }
    );
  }

  // Materias x usuario
  obtenerMisMaterias(): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.apiUrl}${environment.apiMateriasUsuario}`
    );
  }
}
