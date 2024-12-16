import { of } from 'rxjs'
import { REST_SERVER_URL } from './configuracion'
import { UserLoginDTO } from '../dtos/user.dto'
import { UserLoginResponseDTO } from '../dtos/user.dto'
import { Autor, Libro } from '../domain/libro'
import { Recomendacion, RecomJSON } from '../domain/recomendacion'
import {
  Ansioso,
  CriterioBusqueda,
  Leedor,
  Promedio,
  UserInfo
} from '../domain/usuario'
import { Valoracion } from '../domain/valoracion'
import { userLoggedInfoJSON } from '../domain/usuario'

//////////////////////////// LOGIN
export const userLoginStub: UserLoginDTO = {
  userName: 'juan123',
  password: 'juanpassword'
}

export const userLoginResponseStub: UserLoginResponseDTO = { userLogedID: 1 }

//////////////////////////// LOGIN

const autor1 = new Autor(2, 'C.S.', 'Lewis', 72, true, 'INGLES', 'C.S. Lewis')

const autor2 = new Autor(
  1,
  'Gabriel',
  'García Márquez',
  87,
  true,
  'ESPANOL',
  'Gabo'
)

const autor3 = new Autor(3, 'Joanne', 'Rowling', 58, true, 'INGLES', 'J.K.')

//AUTORES STUB
export const autoresStub = [autor1, autor2, autor3]

//// LIBROS//////
const libro1 = new Libro(
  1,
  'Relato de un Náufrago',
  80000,
  350,
  600,
  3,
  15000,
  autor2,
  ['ESPANOL', 'INGLES', 'FRANCES', 'ITALIANO', 'PORTUGUES', 'ALEMAN'],
  ['ESPANOL', 'INGLES', 'FRANCES', 'ITALIANO', 'PORTUGUES', 'ALEMAN'],
  true
)

const libro2 = new Libro(
  2,
  'Las Crónicas de Narnia',
  50000,
  250,
  600,
  2,
  200,
  autor1,
  ['INGLES'],
  ['INGLES'],
  false
)
//// Unico libro que trae la Recomendacion con id 1, que trae el usuario 1////////
const libroLosJuegosDelHambre = new Libro(
  10,
  'Los juegos del hambre',
  70000,
  400,
  600,
  5,
  150,
  autor3,
  ['ESPANOL', 'INGLES', 'FRANCES', 'ITALIANO', 'PORTUGUES'],
  ['ESPANOL', 'INGLES', 'FRANCES', 'ITALIANO', 'PORTUGUES'],
  true
)

//Libros STUB
export const librosStub = [libro1, libro2, libroLosJuegosDelHambre]

//USUARIO 1 ////
export const usuario: userLoggedInfoJSON = {
  userName: 'juan123',
  password: 'juanpassword',
  isLoggedTest: true,
  listaDeAmigos: [],
  name: 'Juan',
  lastName: 'Pérez',
  email: 'juan@example.com',
  birthdate: new Date('1992-03-05'),
  avgTime: 120,
  tipoLector: 'Promedio',
  criterioBusqueda: [],
  limMin: 1,
  limMax: 10,
  librosLeidos: [],
  autoresPreferidos: [],
  id: 1
}

const usuarioInfo = UserInfo.fromJson(usuario)

//RECOMENDACION con Id 1//
export const recomendacion = new Recomendacion(
  'Recomendacion Loca',
  false,
  usuarioInfo,
  'Una colección de libros sobre aventuras mágicas.',
  [libroLosJuegosDelHambre],
  [],
  1
)

//RECOMENDACION PUBLICA CON ID 2//
export const recomendacion2 = new Recomendacion(
  'Recomendacion 2',
  true,
  usuarioInfo,
  'Algun texto',
  [libro1, libro2],
  [],
  2
)

//RECOMENDACION PUBLICA CON ID 3//
export const recomendacion3 = new Recomendacion(
  'Recomendacion Nueva',
  true,
  usuarioInfo,
  'Algun texto nuevo',
  [libro1],
  [],
  3
)

export const recomendacionesStub = [recomendacion, recomendacion2]

export const getHttpClienteSpy = () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', [
    'get',
    'put',
    'post',
    'delete'
  ])

  httpClientSpy.post
    .withArgs(`${REST_SERVER_URL}/usuario/login`, userLoginStub)
    .and.returnValue(of(userLoginResponseStub))

  httpClientSpy.get
    .withArgs(`${REST_SERVER_URL}/usuario/logged/1`)
    .and.returnValue(of(usuario))

  httpClientSpy.get
    .withArgs(`${REST_SERVER_URL}/usuario/1`)
    .and.returnValue(of(usuario))

  httpClientSpy.get
    .withArgs(`${REST_SERVER_URL}/libro/1`)
    .and.returnValue(of(libro1))

  httpClientSpy.get
    .withArgs(`${REST_SERVER_URL}/libro/2`)
    .and.returnValue(of(libro2))

  httpClientSpy.get
    .withArgs(`${REST_SERVER_URL}/libros`)
    .and.returnValue(of(librosStub))

  httpClientSpy.get
    .withArgs(`${REST_SERVER_URL}/recomendaciones/1`)
    .and.returnValue(of(recomendacionesStub[0]))

  httpClientSpy.get
    .withArgs(`${REST_SERVER_URL}/recomendaciones/2`)
    .and.returnValue(of(recomendacionesStub[1]))

  httpClientSpy.get
    .withArgs(`${REST_SERVER_URL}/recomendaciones`)
    .and.returnValue(of(recomendacionesStub))

  //Simula agregar una valoracion a la recomendacion con id 2
  httpClientSpy.put
    .withArgs(
      `${REST_SERVER_URL}/recomendaciones/1/valoraciones`,
      jasmine.any(Object)
    )
    .and.callFake((_url: string, valoracion: Valoracion) => {
      const recomendacionActualizada = Recomendacion.fromJSON({
        ...recomendacionesStub[0].toJSON(),
        valoraciones: [
          ...(recomendacionesStub[0].valoraciones || []),
          valoracion
        ]
      })
      return of(recomendacionActualizada)
    })

    // httpClientSpy.post
    // .withArgs(`${REST_SERVER_URL}/crear-recomendaciones/${recomendacion3.creador?.id}`, recomendacion3)
    // .and.callFake(() => {
    //   recomendacionesStub.push(recomendacion3)
    //   return of(recomendacion3)
    // })


  return httpClientSpy
}
