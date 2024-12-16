import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { REST_SERVER_URL } from '../configuracion'
import { lastValueFrom } from 'rxjs'
import { Libro, LibroJSON } from '../../domain/libro'

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  constructor(private httpClient: HttpClient) {}

  async getLibrosById(id: number) {
    const libroJSON$ = this.httpClient.get<LibroJSON[]>(
      `${REST_SERVER_URL}/libros/${id}`
    )
    const libroJSON = await lastValueFrom(libroJSON$)
    return libroJSON.map((libro) => Libro.fromJSON(libro))
  }

  async deleteLibro(idRecomendacion: Number, idLibro: number) {
    console.log('Llegue al service')
    const delete$ = this.httpClient.delete(
      `${REST_SERVER_URL}/${idRecomendacion}/libro/${idLibro}`
    )
    await lastValueFrom(delete$)
    console.log('Libro eliminado correctamente')
  }

  async getAllLibros(): Promise<Libro[]> {
    try {
      const librosJSON$ = this.httpClient.get<LibroJSON[]>(
        `${REST_SERVER_URL}/libros`
      )
      const librosJSON = await lastValueFrom(librosJSON$)
      return librosJSON.map((libro) => Libro.fromJSON(libro))
    } catch (error) {
      console.error('Error al obtener los libros', error)
      throw error
    }
  }

  async getLibrosFilter(filter: string) {
    const libroJSON$ = this.httpClient.get<LibroJSON[]>(
      `${REST_SERVER_URL}/libros/filter?texto=${filter}`
    )
    const libroJSON = await lastValueFrom(libroJSON$)
    return libroJSON.map((libro) => Libro.fromJSON(libro))
  }
}
