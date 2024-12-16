export type ValoracionJSON = {
  idUsuario?: number
  valor?: number
  comentario?: string
  userName?: string
}

export class Valoracion {
  constructor(
    public idUsuario?: number,
    public valor?: number,
    public comentario?: string,
    public userName?: string
  ) {}
  static fromJSON(valoracionJSON: ValoracionJSON): Valoracion {
    return Object.assign(new Valoracion(), valoracionJSON)
  }

  toJSON(): ValoracionJSON {
    return {
      idUsuario: this.idUsuario,
      valor: this.valor,
      comentario: this.comentario
    }
  }
}
