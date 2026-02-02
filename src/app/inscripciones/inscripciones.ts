import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { InscripcionService } from '../core/services/inscripcion.service';
import { InscDetalle } from '../shared/models/inscripciones.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../core/services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './inscripciones.html'
})
export class InscripcionesComponent implements OnInit {

  displayedColumns: string[] = [
    'select',
    'nombreMateria',
    'nombreProfesor',
    'estudiantes'
  ];
  nombreEstudiante: string = '';
  dataSource = new MatTableDataSource<InscDetalle>([]);
  selection = new SelectionModel<InscDetalle>(true, []);

  constructor(
    private inscripcionService: InscripcionService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.nombreEstudiante = this.authService.getNombreUsuario();
    this.cargarMaterias();
  }

  // cargar materias desde backend
  cargarMaterias(): void {
    this.inscripcionService.obtenerMateriasConCupo()
      .subscribe({
        next: data => {
          this.dataSource.data = data;
          this.inscripcionService.obtenerMisMaterias()
            .subscribe(ids => {
              const yaInscritas = this.dataSource.data.filter(m => ids.includes(m.idMateria));
              yaInscritas.forEach(m => this.selection.select(m));
              this.cd.detectChanges();
            });
        },
      });
  }

  // inscribir materias seleccionadas
  inscribir(): void {
    const materiasSeleccionadas = this.selection.selected.map(m => m.idMateria);

    if (materiasSeleccionadas.length === 0) {
      this.snackBar.open(
        'Selecciona al menos una materia',
        'Cerrar',
        { duration: 3000 }
      );
      return;
    }

    if (materiasSeleccionadas.length > 3) {
      this.snackBar.open(
        'Solo puedes inscribir máximo 3 materias',
        'Cerrar',
        { duration: 3000 }
      );
      return;
    }

    this.inscripcionService.inscribirMaterias(materiasSeleccionadas)
      .pipe(take(1)) // 🔹 evita dobles emisiones
      .subscribe({
        next: res => {
          this.snackBar.open(
            res.message ?? 'Inscripción exitosa',
            'OK',
            { duration: 3000 }
          );

          this.selection.clear();
          this.cargarMaterias();
        },
        error: err => {
          const mensaje =
            err.error?.message ||
            err.error ||
            'Error inesperado en el servidor';

          this.snackBar.open(
            mensaje,
            'Cerrar',
            { duration: 4000 }
          );
        }
      });
  }

  isAllSelected() {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: InscDetalle): string {
    return !row
      ? `${this.isAllSelected() ? 'Deseleccionar' : 'Seleccionar'} todo`
      : `${this.selection.isSelected(row) ? 'Deseleccionar' : 'Seleccionar'} materia`;
  }

  logout(): void {
    this.authService.logout();
  }

  get maxMateriasAlcanzado(): boolean {

    const totalSeleccionadas = this.selection.selected.length;
    return totalSeleccionadas >= 3;
  }

}
