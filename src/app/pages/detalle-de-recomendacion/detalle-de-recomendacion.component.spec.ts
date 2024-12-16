import { TestBed, ComponentFixture, tick } from '@angular/core/testing'
import { DetalleDeRecomendacionComponent } from './detalle-de-recomendacion.component'
import { RecomendacionesService } from '../../services/recomendaciones/recomendaciones.service'
import { AuthService } from '../../services/auth/auth.service'
import { ErrorHandlerService } from '../../services/error/error-handler.service'
import { ActivatedRoute } from '@angular/router'
import { from, of } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Valoracion } from '../../domain/valoracion'
import {
  getHttpClienteSpy,
  recomendacionesStub,
  
} from '../../services/httpClientSpy'
import { Recomendacion } from '../../domain/recomendacion'
import { By } from '@angular/platform-browser'
//saco el f describee
describe('DetalleDeRecomendacionComponent', () => {
  let component: DetalleDeRecomendacionComponent
  let fixture: ComponentFixture<DetalleDeRecomendacionComponent>
  let recomendacionesService: RecomendacionesService
  let authService: AuthService
  let errorHandlerService: ErrorHandlerService
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(async () => {
    httpClientSpy = getHttpClienteSpy()

    await TestBed.configureTestingModule({
      imports: [DetalleDeRecomendacionComponent],
      declarations: [],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        RecomendacionesService,
        ErrorHandlerService,
        AuthService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '2' // Simula obtener el id de la recomendación desde la URL
              }
            }
          }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(DetalleDeRecomendacionComponent)
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
  })

  it('Debe agregar una valoracion a la recomendacion', async () => {
    const mockValoracion = new Valoracion(
      1,
      1,
      'Excelente recomendacion',
      'juan123'
    )

    const recomendacionId = recomendacionesStub[1].id

    // Espiar el método addValoracionToRecomendacion del servicio
    spyOn(
      recomendacionesService,
      'addValoracionToRecomendacion'
    ).and.returnValue(
      Promise.resolve(
        Recomendacion.fromJSON({
          ...recomendacionesStub[1].toJSON(),
          valoraciones: [...recomendacionesStub[1].valoraciones, mockValoracion]
        })
      )
    )

    await component.addValoracion(mockValoracion)

    expect(
      recomendacionesService.addValoracionToRecomendacion
    ).toHaveBeenCalledWith(recomendacionId, mockValoracion.toJSON())
    expect(component.recomendacion?.valoraciones?.length).toBe(1)
    expect(component.recomendacion?.valoraciones?.[0]).toEqual(mockValoracion)
  })

  it('Debe mostrar un mensaje de error cuando no cumple los requerimientos', async () => {
    const mockErrorMessage =
      'El usuario no cumple con los requerimientos para valorar esta recomendación'
    const mockErrorResponse = {
      status: 400,
      error: { message: mockErrorMessage }
    }

    spyOn(
      recomendacionesService,
      'addValoracionToRecomendacion'
    ).and.returnValue(Promise.reject(mockErrorResponse))

    await component.addValoracion(
      new Valoracion(1, 1, 'Buena recomendación', 'juan123')
    )

    fixture.whenStable().then(() => {
      fixture.detectChanges()
      const errorMessage = getByTestId('errorMessage')
      expect(errorMessage).toBeTruthy()
    })
  })

  function getByTestId(testId: string) {
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testId}"]`)
  }
})
