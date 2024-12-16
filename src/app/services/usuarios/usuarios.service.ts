import { Injectable } from '@angular/core'
import * as UsuarioInfo from '../../domain/usuario'
import { HttpClient } from '@angular/common/http'
import { lastValueFrom } from 'rxjs'
import { REST_SERVER_URL } from '../configuracion'
import { Observable } from 'rxjs'
import { amigoJSON, amigo } from '../../domain/amigos'
import { Libro, LibroJSON } from '../../domain/libro'
import { Recomendacion, RecomJSON } from '../../domain/recomendacion'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usuario = UsuarioInfo.UsuarioDTO
  private userLoggInfo = UsuarioInfo.UserInfo
  private API_URL = REST_SERVER_URL + '/usuario/login'
  private usuarioJSON: UsuarioInfo.UsuarioDTOJSON | undefined
  private userLoggInfoJSON: UsuarioInfo.userLoggedInfoJSON | undefined

  constructor(private http: HttpClient) {}

  isLoggedIn: Boolean = false

  login(userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}`, { userName, password })
  }

  async getAmigos(id: number): Promise<amigo[] | undefined> {
    const amigos$ = this.http.get<amigoJSON[]>(
      `${REST_SERVER_URL}/usuario/amigos/${id}`
    )
    const amigosJson = await lastValueFrom(amigos$)
    console.log(amigosJson)
    return amigosJson.map((amigos) => amigo.fromJSON(amigos))
  }

  async getUsuario(id: number): Promise<UsuarioInfo.UsuarioDTO | undefined> {
    const UserJSON$ = this.http.get<UsuarioInfo.UsuarioDTOJSON>(
      `${REST_SERVER_URL}/usuario/perfil/${id}`
    )
    this.usuarioJSON = await lastValueFrom(UserJSON$)
    console.log(this.usuario.fromJSON(this.usuarioJSON))
    return this.usuario.fromJSON(this.usuarioJSON)
  }

  //**************************************************
  // para la vista de busqeda principal
  async getUsuarioInfo(
    id: number
  ): Promise<UsuarioInfo.UserInfo | undefined> {
    const UserJSON$ = this.http.get<UsuarioInfo.userLoggedInfoJSON>(
      `${REST_SERVER_URL}/usuario/logged/${id}`
    )
    this.userLoggInfoJSON = await lastValueFrom(UserJSON$)
    console.log(this.userLoggInfo.fromJson(this.userLoggInfoJSON))
    return this.userLoggInfo.fromJson(this.userLoggInfoJSON)
  }
  //**************************************************
  async editarUsuario(UsuarioUpdate: UsuarioInfo.UsuarioDTOJSON, id: number) {
    const Actualizar$ = this.http.put(
      `${REST_SERVER_URL}/usuario/perfil/update/${id}`,
      UsuarioUpdate
    )
    await lastValueFrom(Actualizar$)
    console.log('Usuario actualizado correctamente')
  }

  async removeAmigo(idUsuario: number, idAmigo: number) {
    const remove$ = this.http.delete(
      `${REST_SERVER_URL}/usuario/amigos/${idUsuario}/${idAmigo}`
    )
    await lastValueFrom(remove$)
  }

  async agregarAmigo(nombre: string, id: number) {
    const add$ = this.http.put(
      `${REST_SERVER_URL}/usuario/amigos/${id}/${nombre}`,
      {}
    )
    await lastValueFrom(add$)
  }

  async getLibrosLeidos(id: Number | null) {
    const librosLeidos$ = this.http.get<LibroJSON[]>(
      `${REST_SERVER_URL}/usuario/perfil/${id}/librosLeidos`
    )
    const librosLeidos = await lastValueFrom(librosLeidos$)
    return librosLeidos.map((libro) => Libro.fromJSON(libro))
  }

  async getLibrosALeer(id: Number | null) {
    const librosALeer$ = this.http.get<LibroJSON[]>(
      `${REST_SERVER_URL}/usuario/perfil/${id}/librosALeer`
    )
    const librosALeer = await lastValueFrom(librosALeer$)
    return librosALeer.map((libro) => Libro.fromJSON(libro))
  }

  async getRecomendacionesAVAlorar(id: Number){
    const recomendacionesAVAlorar$ = this.http.get<RecomJSON[]>(
      `${REST_SERVER_URL}/usuario/recomendaciones/${id}`
    )
    const recomendacionesAValorar = await lastValueFrom(recomendacionesAVAlorar$)
    return recomendacionesAValorar.map((recomendacion) => Recomendacion.fromJSON(recomendacion))
  }
}


