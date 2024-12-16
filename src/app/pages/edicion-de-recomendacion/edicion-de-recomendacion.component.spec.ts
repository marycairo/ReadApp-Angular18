import { TestBed, ComponentFixture } from '@angular/core/testing'
import { EdicionDeRecomendacionComponent } from './edicion-de-recomendacion.component'
import { RecomendacionesService } from '../../services/recomendaciones/recomendaciones.service'
import { AuthService } from '../../services/auth/auth.service'
import { ErrorHandlerService } from '../../services/error/error-handler.service'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import {
  getHttpClienteSpy,
  librosStub,
  recomendacion,
  recomendacion3,
  recomendacionesStub,
  usuario
} from '../../services/httpClientSpy'
import { Recomendacion } from '../../domain/recomendacion'
import { getNgModuleById } from '@angular/core'
import { By } from '@angular/platform-browser'
import { throwError } from 'rxjs'

describe('EdicionDeRecomendacionComponent', () => {
  let component: EdicionDeRecomendacionComponent
  let fixture: ComponentFixture<EdicionDeRecomendacionComponent>
  let recomendacionesService: RecomendacionesService
  let authService: AuthService
  let errorHandlerService: ErrorHandlerService
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let routerSpy: jasmine.SpyObj<Router>

  beforeEach(async () => {
    httpClientSpy = getHttpClienteSpy()
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'])
    await TestBed.configureTestingModule({
      imports: [EdicionDeRecomendacionComponent],
      declarations: [],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Router, useValue: routerSpy },
        RecomendacionesService,
        ErrorHandlerService,
        AuthService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '2'
              }
            }
          }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(EdicionDeRecomendacionComponent)
    component = fixture.componentInstance
    recomendacionesService = TestBed.inject(RecomendacionesService)
    authService = TestBed.inject(AuthService)
    errorHandlerService = TestBed.inject(ErrorHandlerService)
  })

  it('Debe crear el component', () => {
    expect(component).toBeTruthy()
  })

  it('Debe cargar una recomendacion con ngOnInit', async () => {
    spyOn(recomendacionesService, 'getRecomendacionById').and.returnValue(
      Promise.resolve(recomendacionesStub[1])
    )
    await component.ngOnInit()
    expect(recomendacionesService.getRecomendacionById).toHaveBeenCalledWith(2)
    expect(component.recomendacion).toEqual(recomendacionesStub[1])
    console.log('nombre', recomendacion.nombre)
  })

  it('Debe eliminar un libro de la lista', async () => {
    component.librosTemporales = librosStub
    component.eliminarLibro(1)
    expect(2).toBe(component.librosTemporales.length)
  })

  it('Debe agregar un libro con el estado correcto al navegar', () => {
    const button = getByTestId('agregarLibro')
    button.click()

    fixture.detectChanges()

    expect(routerSpy.navigate).toHaveBeenCalled()
    const [route, navigationExtras] = routerSpy.navigate.calls.first().args
    expect(route).toEqual(['/busqueda-de-libros'])

    const expectedState = {
      idRecomendacion: '2',
      nuevoNombre: component.nuevoNombre,
      nuevoDetalle: component.nuevoDetalle,
      esPublico: component.esPublico,
      librosTemporales: component.librosTemporales.map((libro) => libro.copy())
    }
    expect(navigationExtras?.state).toEqual(expectedState)
  })
  it('debe mostrar un mensaje de error si los campos están vacíos', async () => {
    component.alta = true
    component.nuevoNombre = ''
    component.nuevoDetalle = ''
    component.librosTemporales = librosStub
    component.esPublico = true

    const mockErrorMessage = 'No puede enviar un campo vacío'
    const mockErrorResponse = { status: 400, error: { message: mockErrorMessage } }

    spyOn(recomendacionesService, 'crearRecomendacion').and.returnValue(
        Promise.reject(mockErrorResponse)
    );
    spyOn(errorHandlerService, 'showError').and.callFake((error) => {
        component.errorMessage = error.error.message})

    await component.guardarCambios()
    fixture.detectChanges()

    const errorMessageElement = getByTestId('errorMessage')
    expect(errorMessageElement).toBeTruthy()
    
})
it('Debe crear una recomendacion', async () => {
})


  it('Debe editar una recomendacion', async () => {})

  function getByTestId(testId: string) {
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testId}"]`)
  }
})
