import { Libro, Autor } from './libro'
import { Recomendacion, RecomJSON } from './recomendacion'

export type UsuarioDTOJSON = {
  userName?: String
  name?: String
  lastName?: String
  email?: String
  birthdate?: Date
  avgTime?: Number
  tipoLector?: String
  tipoPerfil?: String[]
  limMin?: Number
  limMax?: Number
  id?: number
}

export class UsuarioDTO {
  constructor(
    public userName?: String,
    public name?: String,
    public lastName?: String,
    public email?: string,
    public birthdate?: Date,
    public avgTime?: Number,
    public tipoLector?: TipoLector,
    public tipoPerfil?: CriterioBusqueda[],
    public limMin?: Number,
    public limMax?: Number,
    public id?: number
  ) {}

  static fromTipoLector(TipoLector?: String) {
    const tiposDeUsuario = {
      LectorPromedio: new Promedio(),
      Ansioso: new Ansioso(),
      Fanatico: new Fanatico(),
      Recurrente: new Recurrente()
    }
    return tiposDeUsuario[TipoLector as keyof typeof tiposDeUsuario]
  }

  static fromTipoPerfil(tipoPerfil?: String) {
    const tiposDePerfil = {
      Precavido: new Precavido(),
      Leedor: new Leedor(),
      Poliglota: new Poliglota(),
      Nativista: new Nativista(),
      Calculador: new Calculador(),
      Demandante: new Demandante(),
      Experimentado: new Experimentado(),
      Cambiante: new Cambiante()
    }
    return tiposDePerfil[tipoPerfil as keyof typeof tiposDePerfil]
  }

  static fromJSON(UsuarioDTOJSON: UsuarioDTOJSON): UsuarioDTO {
    const tiposDePerfil: CriterioBusqueda[] = []
    UsuarioDTOJSON.tipoPerfil?.forEach((element) => {
      tiposDePerfil.push(this.fromTipoPerfil(element))
    })

    return Object.assign(
      new UsuarioDTO(
        '',
        '',
        '',
        '',
        new Date(),
        0,
        new Promedio(),
        tiposDePerfil,
        0,
        0,
        0
      ),
      UsuarioDTOJSON,
      {
        tipoLector: this.fromTipoLector(UsuarioDTOJSON.tipoLector),
        tipoPerfil: tiposDePerfil
      }
    )
  }
}

// export type UsuarioJSON = {
//   userName?: String,
//   password?: String,
//   isLoggedTest?: Boolean,
//   listaDeAmigos?: Array<UsuarioInfo>,
//   name?: String,
//   lastName?: String,
//   email?: String,
//   birthdate?: Date,
//   avgTime?: Number,
//   tipoLector?: TipoLector,
//   criterioBusqueda?: CriterioBusqueda[],
//   limMin?: Number,
//   limMax?: Number,
//   id?: number
// }
// export class UsuarioInfo {
//   constructor(
//     public userName?: string,
//     public password?: string,
//     public isLoggedTest?: boolean,
//     public listaDeAmigos?: Array<UsuarioInfo>, // variable de prueba que usaremos de forma momentanea
//     //para usarlo como el usuario loggueado
//     public name?: string,
//     public lastName?: string,
//     public email?: string,
//     public birthdate?: Date,
//     public avgTime?: number,
//     public tipoLector?: TipoLector,
//     public criterioBusqueda?: CriterioBusqueda[],
//     public limMin?: Number,
//     public limMax?: Number,
//     public id?: number
//   ) {}

//   static fromJSON(UsuarioJSON: UsuarioJSON): UsuarioInfo {
//     return Object.assign(new UsuarioInfo(), UsuarioJSON, {
//       listaDeAmigos: UsuarioJSON.listaDeAmigos
//         ? UsuarioJSON.listaDeAmigos.map(UsuarioInfo.fromJSON)
//         : undefined
//     })
//   }
// }

export type userLoggedInfoJSON = {
  userName?: string
  password?: string
  isLoggedTest?: boolean
  listaDeAmigos?: Array<userLoggedInfoJSON>
  name?: string
  lastName?: string
  email?: string
  birthdate?: Date
  avgTime?: number
  tipoLector?: String
  criterioBusqueda?: CriterioBusqueda[]
  limMin?: Number
  limMax?: Number
  librosLeidos?: Array<Libro>
  autoresPreferidos?: Array<Autor>
  id?: number
  recomendacionesAValorar?: Array<RecomJSON>
}
export class UserInfo {
  constructor(
    public userName?: string,
    public password?: string,
    public isLoggedTest?: boolean,
    public listaDeAmigos: Array<UserInfo> = [],
    public name?: string,
    public lastName?: string,
    public email?: string,
    public birthdate?: Date,
    public avgTime?: number,
    public tipoLector: TipoLector = Promedio.getInstancia(),
    public criterioBusqueda: CriterioBusqueda[] = [],
    public limMin?: Number,
    public limMax?: Number,
    public palabrasPorMinuto?: number,
    public librosLeidos: Array<Libro> = [],
    public autoresPreferidos: Array<Autor> = [],
    public id?: number,
    public recomendacionesAValorar: Array<Recomendacion> = []
  ) {}
  static fromTipoLector(TipoLector?: String) {
    const tiposDeUsuario = {
      LectorPromedio: Promedio.getInstancia(),
      Ansioso: Ansioso.getInstancia(),
      Fanatico: Fanatico.getInstancia(),
      Recurrente: Recurrente.getInstancia()
    }
    return tiposDeUsuario[TipoLector as keyof typeof tiposDeUsuario]
  }

  static fromJson(userLoggedInfoJSON: userLoggedInfoJSON): UserInfo {
    return Object.assign(new UserInfo(), userLoggedInfoJSON, {
      tipoLector: userLoggedInfoJSON.tipoLector
        ? UserInfo.fromTipoLector(userLoggedInfoJSON.tipoLector)
        : new Promedio(),
      listaDeAmigos: userLoggedInfoJSON.listaDeAmigos
        ? userLoggedInfoJSON.listaDeAmigos.map(UserInfo.fromJson)
        : [],
      librosLeidos: userLoggedInfoJSON.librosLeidos
        ? userLoggedInfoJSON.librosLeidos.map(Libro.fromJSON)
        : [],
      autoresPreferidos: userLoggedInfoJSON.autoresPreferidos
        ? userLoggedInfoJSON.autoresPreferidos.map(Autor.fromJSON)
        : [],
      recomendacionesAValorar: userLoggedInfoJSON.recomendacionesAValorar
        ? userLoggedInfoJSON.recomendacionesAValorar.map(Recomendacion.fromJSON)
        : []
    })
  }

  toJSON(): userLoggedInfoJSON {
    return {
      userName: this.userName,
      password: this.password,
      isLoggedTest: this.isLoggedTest,
      listaDeAmigos: this.listaDeAmigos.map((amigo) => amigo.toJSON()),
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      birthdate: this.birthdate,
      avgTime: this.avgTime,
      tipoLector: this.tipoLector
        ? this.tipoLector.tipoLectorString()
        : undefined,
      criterioBusqueda: this.criterioBusqueda,
      limMin: this.limMin,
      limMax: this.limMax,
      librosLeidos: this.librosLeidos,
      autoresPreferidos: this.autoresPreferidos,
      id: this.id
    }
  }

  tiempoLecturaPromedio(libro: Libro): number {
    const factorDesafiante = libro.esDesafiante() ? 2 : 1
    return (
      (libro.cantidadPalabras! / this.palabrasPorMinuto!) * factorDesafiante
    )
  }
  tiempoLecturaPara(libro: Libro): number {
    return this.tipoLector!.tiempoDeLectura(this, libro)
  }
  leyoLibro(libro: Libro): boolean {
    return this.librosLeidos!.some((libroLeido) => libroLeido.id === libro.id)
  }
  vecesLeido(libro: Libro): number {
    return this.librosLeidos!.filter((l) => l === libro).length
  }
  tengoEstaRecomendacion(recomendacion: number): boolean {
    return this.recomendacionesAValorar!.some((rec) => rec.id === recomendacion)
  }
}
export interface TipoLector {
  tiempoDeLectura(usuario: UserInfo, libro: Libro): number
  tipoLectorString(): String
}

export class Promedio implements TipoLector {
  private static instancia: Promedio
  public static getInstancia(): Promedio {
    if (!this.instancia) {
      this.instancia = new Promedio()
    }
    return this.instancia
  }

  tiempoDeLectura(usuario: UserInfo, libro: Libro) {
    return usuario.tiempoLecturaPromedio(libro)
  }
  tipoLectorString() {
    return 'LectorPromedio'
  }
}

export class Ansioso implements TipoLector {
  private static instancia: Ansioso
  public static getInstancia(): Ansioso {
    if (!this.instancia) {
      this.instancia = new Ansioso()
    }
    return this.instancia
  }

  tiempoDeLectura(usuario: UserInfo, libro: Libro) {
    if (libro.esBestSeller()) {
      return usuario.tiempoLecturaPromedio(libro) * 0.5
    } else {
      return (
        usuario.tiempoLecturaPromedio(libro) -
        usuario.tiempoLecturaPromedio(libro) * 0.2
      )
    }
  }
  tipoLectorString() {
    return 'Ansioso'
  }
}

export class Fanatico implements TipoLector {
  private static instancia: Fanatico
  public static getInstancia(): Fanatico {
    if (!this.instancia) {
      this.instancia = new Fanatico()
    }
    return this.instancia
  }
  tiempoDeLectura(usuario: UserInfo, libro: Libro) {
    if (this.checkearAutorYSiLeyo(usuario, libro)) {
      return this.seTomaSuTiempo(usuario, libro)
    } else {
      return usuario.tiempoLecturaPromedio(libro)
    }
  }
  private checkearAutorYSiLeyo(usuario: UserInfo, libro: Libro): boolean {
    return (
      usuario.autoresPreferidos!.some(
        (autor) => autor.id === libro.autor!.id
      ) && !usuario.leyoLibro(libro)
    )
  }

  private seTomaSuTiempo(usuario: UserInfo, libro: Libro): number {
    if (!libro.esLargo()) {
      return usuario.tiempoLecturaPromedio(libro) + 2 * libro.cantidadPaginas!
    } else {
      return (
        usuario.tiempoLecturaPromedio(libro) +
        2 * libro.paginasParaSerLargo! +
        (libro.cantidadPaginas! - libro.paginasParaSerLargo!)
      )
    }
  }

  tipoLectorString() {
    return 'Fanatico'
  }
}

export class Recurrente implements TipoLector {
  private static instancia: Recurrente
  public static getInstancia(): Recurrente {
    if (!this.instancia) {
      this.instancia = new Recurrente()
    }
    return this.instancia
  }

  tiempoDeLectura(usuario: UserInfo, libro: Libro): number {
    return (
      usuario.tiempoLecturaPromedio(libro) -
      this.descuentoVecesLeido(libro, usuario)
    )
  }

  private descuentoVecesLeido(libro: Libro, usuario: UserInfo): number {
    const vecesLeido = usuario.vecesLeido(libro)
    if (vecesLeido <= 5) {
      return vecesLeido * 0.01 * usuario.tiempoLecturaPromedio(libro)
    } else {
      return 0.05 * usuario.tiempoLecturaPromedio(libro)
    }
  }

  tipoLectorString() {
    return 'Recurrente'
  }
}

export interface CriterioBusqueda {
  tipoPerfilString(): String
}

export class Precavido implements CriterioBusqueda {
  tipoPerfilString() {
    return 'Precavido'
  }
}

export class Leedor implements CriterioBusqueda {
  tipoPerfilString() {
    return 'Leedor'
  }
}

export class Poliglota implements CriterioBusqueda {
  tipoPerfilString() {
    return 'Poliglota'
  }
}

export class Demandante implements CriterioBusqueda {
  tipoPerfilString() {
    return 'Demandante'
  }
}

export class Nativista implements CriterioBusqueda {
  tipoPerfilString() {
    return 'Nativista'
  }
}

export class Experimentado implements CriterioBusqueda {
  tipoPerfilString() {
    return 'Experimentado'
  }
}

export class Cambiante implements CriterioBusqueda {
  tipoPerfilString() {
    return 'Cambiante'
  }
}

export class Calculador implements CriterioBusqueda {
  tipoPerfilString() {
    return 'Calculador'
  }
}
