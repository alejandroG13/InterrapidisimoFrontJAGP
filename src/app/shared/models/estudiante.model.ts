export interface Estudiante {
  idEstudiante: number;
  nombres: string;
  apellidos: string;
  email: string;
}

export interface CrearEstudianteDto {
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  confirmarPassword: string;
}
