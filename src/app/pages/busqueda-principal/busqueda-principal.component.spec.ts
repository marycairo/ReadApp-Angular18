// import {
//   ComponentFixture,
//   TestBed,
//   fakeAsync,
//   flush,
//   tick
// } from '@angular/core/testing'

// import { TareasComponent } from './tareas.component'
// import { getHttpClientSpy } from 'services/httpClientSpy'
// import { HttpClient } from '@angular/common/http'
// import { Router } from '@angular/router'
// import { registerLocaleData } from '@angular/common'
// import localeEs from '@angular/common/locales/es'
// import { throwError } from 'rxjs'

// //
// /** Registramos el locale ES para formatear números */
// // Font Awesome para los íconos
// //
// // routing
// // componentes propios



// describe('TareasComponent', () => {
//   let component: TareasComponent
//   let fixture: ComponentFixture<TareasComponent>
//   let routerSpy: jasmine.SpyObj<Router>
//   let httpClientSpy: jasmine.SpyObj<HttpClient>

//   beforeEach(async () => {
//     routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'])
//     httpClientSpy = getHttpClientSpy()

//     await TestBed.configureTestingModule({
//       imports: [TareasComponent],
//       providers: [
//         { provide: HttpClient, useValue: httpClientSpy },
//         { provide: Router, useValue: routerSpy }
//       ]
//     }).compileComponents()

//     fixture = TestBed.createComponent(TareasComponent)
//     component = fixture.componentInstance
//     fixture.detectChanges()

//     await fixture.whenStable()
//     fixture.detectChanges()
//   })

//   it('should create', () => {
//     expect(component).toBeTruthy()
//   })
// })
