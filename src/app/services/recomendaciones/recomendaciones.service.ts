import { Injectable } from '@angular/core'
import { Recomendacion, RecomJSON } from '../../domain/recomendacion'
import { HttpClient } from '@angular/common/http'
import { filter, lastValueFrom } from 'rxjs'
import { Valoracion, ValoracionJSON } from '../../domain/valoracion'
import { REST_SERVER_URL } from '../configuracion'
import { RecomendacionEdit } from '../../domain/recomendacionedit'

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {
  private apiURL = 'assets/fake-new-recomendation.json'
  private recomendacion: Recomendacion | undefined
  private recomendaciones: Recomendacion[] = []
  
  constructor(private http: HttpClient) {}

  buscarRecomendaciones(): Recomendacion[] {
    return this.recomendaciones
  }

  async getRecomendaciones(filtro: string): Promise<Recomendacion[]> {
    // const RecomJSON$ = this.http.get<RecomJSON[]>(this.apiURL)
    const RecomJSON$ = this.http.get<RecomJSON[]>(
      `${REST_SERVER_URL}/recomendaciones/filter?texto=${filtro}`
    )
    const RecomJSON = await lastValueFrom(RecomJSON$)
    return RecomJSON.map((recomendacion) =>
      Recomendacion.fromJSON(recomendacion)
    )
  }

  async getRecomendacionById(id: number): Promise<Recomendacion | undefined> {
    const recomendacion$ = this.http.get<RecomJSON>(
      `${REST_SERVER_URL}/recomendaciones/${id}`
    )
    const RecomJSON = await lastValueFrom(recomendacion$)
    console.log(RecomJSON)
    return Recomendacion.fromJSON(RecomJSON)
    // return Promise.reject({status: 400,error: {message: 'Error 400: Recomendación no encontrada.'}}) SIMULA UN ERROR 400
  }

  async getRecomendacionByUserLogged(
    filtro: string,
    id: number
  ): Promise<Recomendacion[]> {
    const RecomJSON$ = this.http.get<RecomJSON[]>(
      `${REST_SERVER_URL}/recomendaciones/user/${id}/filter?texto=${filtro}`
    )
    const RecomJSON = await lastValueFrom(RecomJSON$)
    return RecomJSON.map((recomendacion) =>
      Recomendacion.fromJSON(recomendacion)
    )
  }
  async getPerfilRecomendaciones(
    filtro: string,
    id: number
  ): Promise<Recomendacion[]> {
    const RecomJSON$ = this.http.get<RecomJSON[]>(
      `${REST_SERVER_URL}/recomendaciones/userPerfil/${id}/filter?texto=${filtro}`
    )
    const RecomJSON = await lastValueFrom(RecomJSON$)
    return RecomJSON.map((recomendacion) =>
      Recomendacion.fromJSON(recomendacion)
    )
  }
  async putRecomendacionAValorar(idUser: number, idRecomendacion: number) {
    const RecomJSON$ = this.http.put<RecomJSON>(`${REST_SERVER_URL}/recomendacion/${idUser}/${idRecomendacion}`, {})
    await lastValueFrom(RecomJSON$)
  }
  async deleteRecomendacionAValorar(idUser: number, idRecomendacion: number) {
    const RecomJSON$ = this.http.delete<RecomJSON>(`${REST_SERVER_URL}/recomendacion/${idUser}/${idRecomendacion}`)
    await lastValueFrom(RecomJSON$)
  }

  async editarRecomendacion(
    id: number,
    recomendacionUpdate: RecomendacionEdit
  ) {
    const Actualizar$ = this.http.put(`${REST_SERVER_URL}/recomendaciones/${id}`, recomendacionUpdate)
    await lastValueFrom(Actualizar$)
  }

  async addValoracionToRecomendacion(
    id?: number,
    valoracionJSON?: ValoracionJSON
  ): Promise<Recomendacion> {
    const valoracion$ = this.http.put<RecomJSON>(
      `${REST_SERVER_URL}/recomendaciones/${id}/valoraciones`,
      valoracionJSON
    )
    const recomendacionActualizada = await lastValueFrom(valoracion$)
    return Recomendacion.fromJSON(recomendacionActualizada)
  }

  async crearRecomendacion(
    idCreador: number,
    recomendacionUpdate: RecomendacionEdit
  ) {
    const crear$ = this.http.post(`${REST_SERVER_URL}/crear-recomendaciones/${idCreador}`, recomendacionUpdate)
    await lastValueFrom(crear$)
  }

    async deleteRecomendacion(idRecomendacion: Number) {
    console.log('Llegue al service')
    const delete$ = this.http.delete(`${REST_SERVER_URL}/recomendaciones/${idRecomendacion}`)
    await lastValueFrom(delete$)
    console.log('Lo elimine')
  }
}
