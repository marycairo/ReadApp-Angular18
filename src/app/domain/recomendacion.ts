import { Libro } from './libro'
import { Valoracion } from './valoracion'
import { UserInfo, userLoggedInfoJSON } from './usuario'

export type RecomJSON = {
  nombre?: string
  publico?: boolean
  creador?: userLoggedInfoJSON
  detalle?: string
  librosRecomendados?: Array<Libro> //aqui se guardan las id de los libros
  valoraciones?: Array<Valoracion>
  contribucionesLimite?: number
  id?: number
}

export class Recomendacion {
  constructor(
    public nombre?: string,
    public publico?: boolean,
    public creador?: UserInfo,
    public detalle: string = '',
    public librosRecomendados?: Array<Libro>,
    public valoraciones: Array<Valoracion> = [],
    public contribucionesLimite?: number,
    public id?: number
  ) {}

  static fromJSON(RecomJSON: RecomJSON): Recomendacion {
    return Object.assign(new Recomendacion(), RecomJSON, {
      valoraciones: RecomJSON.valoraciones
        ? RecomJSON.valoraciones.map(Valoracion.fromJSON)
        : undefined,
      librosRecomendados: RecomJSON.librosRecomendados
        ? RecomJSON.librosRecomendados.map(Libro.fromJSON)
        : undefined,
      creador: RecomJSON.creador
        ? UserInfo.fromJson(RecomJSON.creador)
        : undefined
    })
  }

  toJSON(): RecomJSON {
    return {
      nombre: this.nombre,
      publico: this.publico,
      creador: this.creador?.toJSON(),
      detalle: this.detalle,
      librosRecomendados: <Libro[]>this.librosRecomendados,
      valoraciones: <Valoracion[]>this.valoraciones,
      contribucionesLimite: this.contribucionesLimite,
      id: this.id
    }
  }

  valoracionesPromedio() {
    if (this.valoraciones.length === 0) {
      return 0
    } else {
      return (
        this.valoraciones.reduce(
          (acc, valoracion) => acc + valoracion.valor!,
          0
        ) / this.valoraciones.length
      )
    }
  }
  cantLibros() {
    return this.librosRecomendados!.length
  }
  esPublico() {
    return this.publico
  }
  esCreador(usuarioLogeadoId: number) {
    //esto se pasa en la vista
    return this.creador?.id === usuarioLogeadoId
  }
  esAmigo(usuarioLogeadoId: number) {
    return this.creador!.listaDeAmigos!.some(
      (amigo) => amigo.id === usuarioLogeadoId
    )
  }

  tiempoTotal(user: UserInfo): number {
    if (this.librosRecomendados!.length === 0) {
      return 0
    } else {
      const tiempoTotal = this.librosRecomendados!.reduce((total, libro) => {
        return total + user.tiempoLecturaPara(libro)
      }, 0)
      return Math.round(tiempoTotal)
    }
  }
}
