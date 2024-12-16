import { Libro } from "./libro"

export interface RecomendacionEdit {
    nombre?: string
    detalle?: string
    librosRecomendados: Libro[]
    publico: boolean

  }
  