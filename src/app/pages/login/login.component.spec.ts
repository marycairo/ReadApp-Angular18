import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { of, throwError } from 'rxjs'
import { LoginComponent } from './login.component'
import { AuthService } from '../../services/auth/auth.service'
import { UserService } from '../../services/usuarios/usuarios.service'
import { UserLoginResponseDTO } from '../../dtos/user.dto'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  let userServiceSpy: jasmine.SpyObj<UserService>
  let authServiceSpy: jasmine.SpyObj<AuthService>
  let routerSpy: jasmine.SpyObj<Router>

  beforeEach(async () => {
    const userServiceMock = jasmine.createSpyObj('UserService', ['login'])
    const authServiceMock = jasmine.createSpyObj('AuthService', ['login'])
    const routerMock = jasmine.createSpyObj('Router', ['navigate'])

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>
  })

  it('Logearse usando credenciales correctas deberia redirigir el usuario a /busqueda-principal', () => {
    const validResponse: UserLoginResponseDTO = { userLogedID: 1 }
    userServiceSpy.login.and.returnValue(of(validResponse))

    component.loginForm.setValue({
      userName: 'juan123',
      password: 'juanpassword'
    })

    component.onSubmit()

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/busqueda-principal'])
  })

  it('Si las credenciales son invalidas, deberia arrojar el mensaje de error del backend.', () => {
    const mockError = {
      error: { message: 'BACKEND ERROR MESSAGE' },
      status: 404
    }
    userServiceSpy.login.and.returnValue(throwError(mockError))

    component.loginForm.setValue({
      userName: 'juan123',
      password: '123'
    })

    component.onSubmit()

    expect(component.errorMessage).toBe('BACKEND ERROR MESSAGE')
  })

  it('Si NO se puede conectar al servidor, deberia mostrarse un mensaje de alerta.', () => {
    const mockError = {
      status: 0
    }
    userServiceSpy.login.and.returnValue(throwError(mockError))

    component.loginForm.setValue({
      userName: 'juan123',
      password: '123'
    })

    component.onSubmit()

    expect(component.errorMessage).toBe(
      'No se puede conectar al servidor. Por favor, intenta más tarde.'
    )
  })

  it('El input de usuario NO puede estar vacío y debería mostrar el mensaje de error.', () => {
    component.loginForm.setValue({
      userName: '',
      password: 'juanpassword'
    })

    component.onSubmit()

    expect(component.loginForm.valid).toBeFalse()
    expect(component.getErrorMessage('userName')).toBe(
      'El nombre de usuario es obligatorio.'
    )
    expect(component.loginForm.get('userName')?.errors?.['required']).toBeTrue()
  })

  it('El input de usuario NO puede contener caracteres inválidos y debería mostrar el mensaje de error.', () => {
    component.loginForm.setValue({
      userName: 'juan!*"#@',
      password: 'juanpassword'
    })

    component.onSubmit()

    expect(component.loginForm.valid).toBeFalse()
    expect(component.getErrorMessage('userName')).toBe(
      'El nombre de usuario solo puede contener letras y números.'
    )

    const userNameControl = component.loginForm.get('userName')
    expect(userNameControl?.errors).toBeTruthy()
    expect(userNameControl?.errors?.['pattern']).toBeDefined()
  })

  it('El input de constraseña NO puede estar vacío y debería mostrar el mensaje de error.', () => {
    component.loginForm.setValue({
      userName: 'juan123',
      password: ''
    })

    component.onSubmit()

    expect(component.loginForm.valid).toBeFalse()
    expect(component.getErrorMessage('password')).toBe(
      'La contraseña es obligatoria.'
    )
    expect(component.loginForm.get('password')?.errors?.['required']).toBeTrue()
  })
})
