export interface InscDetalle {
  idMateria: number;
  nombreMateria: string;
  nombreProfesor: string;
  estudiantesInscritos: string[];
}

export interface InscCrear {
  idEstudiante: number,
  idMateria: number,
}