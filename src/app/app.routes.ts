import { Routes } from '@angular/router';
import { DetalleDeRecomendacionComponent } from './pages/detalle-de-recomendacion/detalle-de-recomendacion.component';
import { LoginComponent } from './pages/login/login.component';
import { EdicionDeRecomendacionComponent } from './pages/edicion-de-recomendacion/edicion-de-recomendacion.component';
import { BusquedaLibrosComponent } from './pages/busqueda-libros/busqueda-libros.component';
import { BusquedaPrincipalComponent } from './pages/busqueda-principal/busqueda-principal.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PerfilInfoComponent } from './components/perfil/info/info.component';
import { PerfilAmigosComponent } from './components/perfil/amigos/amigos.component';
import { PerfilLibrosLeidosComponent } from './components/perfil/libros-leidos/libros-leidos.component';
import { PerfilLibrosPorLeerComponent } from './components/perfil/libros-por-leer/libros-por-leer.component';
import { PerfilRecomendacionesComponent } from './components/perfil/recomendaciones/recomendaciones.component';
import { AuthGuard } from './services/guard/auth.guard'; 
import { RecomendacionesService } from './services/recomendaciones/recomendaciones.service';
import { Recomendacion } from './domain/recomendacion';
import { Libro } from './domain/libro';
import { LibrosService } from './services/libros/libros.service';

export type DataBusqueda={
    showCheckbox: boolean,
    buscar: (serviceRecom:RecomendacionesService, filter?:string, id?: number) => Promise<Recomendacion[]>
}

const dataBusquedaTotal:DataBusqueda={
  showCheckbox:false,
  buscar: async (serviceRecom:RecomendacionesService, filter?:string, id?: number) => {
    return serviceRecom.getRecomendaciones(filter!)
  }
}
const dataBusquedaPerfil:DataBusqueda={
  showCheckbox:false,
  buscar: async (serviceRecom:RecomendacionesService, filter?:string, id?: number) => {
    return serviceRecom.getPerfilRecomendaciones(filter!, id!)
  }
}
const dataBusquedaMisRecomendaciones:DataBusqueda={
  showCheckbox:true,
  buscar: async (serviceRecom:RecomendacionesService, filter?:string, id?: number) => {
    return serviceRecom.getRecomendacionByUserLogged(filter!, id!)
  }
}

export type DataBusquedaLibros={
  buscar: (serviceLibros: LibrosService, filter?:string) => Promise<Libro[]>
}

const dataBusquedaLibros:DataBusquedaLibros={
  buscar: async (serviceLibros: LibrosService, filter?:string) => {
    return serviceLibros.getLibrosFilter(filter!)
  } 
}

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'detalle-de-recomendacion/:id',
    component: DetalleDeRecomendacionComponent,
    canActivate: [AuthGuard]  
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'edicion-de-recomendacion/:id',
    component: EdicionDeRecomendacionComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard],  
    children: [
      {
        path: 'info',
        component: PerfilInfoComponent,
        canActivate: [AuthGuard] 
      },
      {
        path: 'amigos',
        component: PerfilAmigosComponent,
        canActivate: [AuthGuard]  
      },
      {
        path: 'libros-leidos',
        component: PerfilLibrosLeidosComponent,
        canActivate: [AuthGuard] 
      },
      {
        path: 'libros-por-leer',
        component: PerfilLibrosPorLeerComponent,
        canActivate: [AuthGuard]  
      },
      {
        path: 'recomendaciones',
        component: PerfilRecomendacionesComponent,
        canActivate: [AuthGuard] 
      }
    ]
  },
  { 
    path: 'busqueda-principal', 
    component: BusquedaPrincipalComponent, 
    canActivate: [AuthGuard],
    data: dataBusquedaPerfil
  },
  { 
    path: 'mis-recomendaciones', 
    component: BusquedaPrincipalComponent, 
    canActivate: [AuthGuard] ,
    data: dataBusquedaMisRecomendaciones
  },
  { 
    path: 'busqueda-de-libros', 
    component: BusquedaLibrosComponent, 
    canActivate: [AuthGuard],
    data: dataBusquedaLibros 
  },
  { path: '**', redirectTo: 'login' } 
];
