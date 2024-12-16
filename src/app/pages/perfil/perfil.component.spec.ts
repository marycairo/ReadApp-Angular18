import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { of, throwError } from 'rxjs'
import { AuthService } from '../../services/auth/auth.service'
import { UserService } from '../../services/usuarios/usuarios.service'
import { UserLoginResponseDTO } from '../../dtos/user.dto'
import { PerfilComponent } from './perfil.component'
import { getHttpClienteSpy } from '../../services/httpClientSpy'
import { REST_SERVER_URL } from '../../services/configuracion'
import { UsuarioDTO } from '../../domain/usuario'
import { HttpClient } from '@angular/common/http'

describe('PerfilComponent', () => {
  let component: PerfilComponent
  let fixture: ComponentFixture<PerfilComponent>
  let userServiceSpy: jasmine.SpyObj<UserService>
  let authServiceSpy: jasmine.SpyObj<AuthService>
  let routerSpy: jasmine.SpyObj<Router>
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(async () => {
    const userServiceMock = jasmine.createSpyObj('UserService', ['perfil'])
    const authServiceMock = jasmine.createSpyObj('AuthService', ['perfil'])
    const routerMock = jasmine.createSpyObj('Router', ['navigate'])
    httpClientSpy = getHttpClienteSpy()

    await TestBed.configureTestingModule({
      imports: [PerfilComponent, ReactiveFormsModule],
      declarations: [],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: UserService, useValue: userServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(PerfilComponent)
    component = fixture.componentInstance
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>
    fixture.detectChanges()
  })

  it('Debe traer nombre de usuario', () => {
    const UsuarioDTOStub: UsuarioDTO = {}
    httpClientSpy.get
      .withArgs(`${REST_SERVER_URL}/usuario/logged/1`)
      .and.returnValue(of(UsuarioDTOStub))

    expect((UsuarioDTOStub.userName = 'Juan123'))
  })
})
