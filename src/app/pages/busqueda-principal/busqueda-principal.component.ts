import { Component } from '@angular/core'
import { CardRecomendacionComponent } from '../../components/cards/card-recomendacion/card-recomendacion.component'
import { MyRecomSearchbarComponent } from '../../components/my-recom-searchbar/my-recom-searchbar.component'
import { SearchbarComponent } from '../../components/searchbar/searchbar.component'
import { Recomendacion } from '../../domain/recomendacion'
import { RecomendacionesService } from '../../services/recomendaciones/recomendaciones.service'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { Libro } from '../../domain/libro'
import { LibrosService } from '../../services/libros/libros.service'
import { DataBusqueda } from '../../app.routes'
import { UserService } from '../../services/usuarios/usuarios.service'
import { FormsModule } from '@angular/forms'
import { RecomendFilterPipe } from '../../pipes/recomend.filter.pipe'
import { AuthService } from '../../services/auth/auth.service'
import { UserInfo } from '../../domain/usuario'
import { ErrorHandlerService } from '../../services/error/error-handler.service'
import { AlertComponent } from "../../components/alert/alert.component";
@Component({
  selector: 'app-busqueda-principal',
  standalone: true,
  imports: [
    CardRecomendacionComponent,
    SearchbarComponent,
    RouterModule,
    MyRecomSearchbarComponent,
    FormsModule,
    RecomendFilterPipe,
    AlertComponent
],
  templateUrl: './busqueda-principal.component.html',
  styleUrl: './busqueda-principal.component.css'
})
export class BusquedaPrincipalComponent {
  recomendacionABuscar = ''
  recomendaciones: Recomendacion[] = []
  libros: Libro[] = []
  data!: DataBusqueda
  filterString = ''
  showPrivate: boolean = false
  usuarioLogeadoId!: number
  userLogged?: UserInfo
  constructor(
    private recomendacionesService: RecomendacionesService,
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private errorService: ErrorHandlerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.data = this.route.snapshot.data as DataBusqueda
    this.usuarioLogeadoId = Number(this.authService.getUserLogedID())
    this.searchUserLogged()
    this.search()
  }

  onSearchTextReceived(textToFilter: string): void {
    this.filterString = textToFilter
    this.search()
  }
  onCheckboxChange(isCheck: boolean) {
    console.log(isCheck)
    this.showPrivate = isCheck
  }

  async onDeleteRecomendation(id: number) {
    try {
      await this.recomendacionesService.deleteRecomendacion(id)
      this.search()
      this.errorService.showSuccess('Recomendacion eliminada correctamente')
    } catch (error) {
      this.errorService.showError(error)
    }
  }
  async onLikeRecomendation(idRecomendacion: number) {
    try{
      if (!this.userLogged!.tengoEstaRecomendacion(idRecomendacion)){ 
        await this.recomendacionesService.putRecomendacionAValorar( this.usuarioLogeadoId, idRecomendacion)
        this.searchUserLogged()
        this.search()
        this.errorService.showSuccess('Recomendacion Seleccionada a Valorar')
      }
      else{
        await this.recomendacionesService.deleteRecomendacionAValorar(this.usuarioLogeadoId, idRecomendacion)
        this.searchUserLogged()
        this.search()
        this.errorService.showSuccess('Quitaste esta recomendacion para Valorar')
      }
    } catch (error){
      this.errorService.showError(error)
    }
  }

  async search() {
    try{

      this.recomendaciones = await this.data.buscar(
        this.recomendacionesService,
        this.filterString,
        this.usuarioLogeadoId
      )
      console.log(this.recomendaciones)
      if (this.recomendaciones.length === 0) {
        this.errorService.showSuccess(
          'No se encontraron recomendaciones'
        )
      }
      console.log(this.userLogged?.id)
      console.log(this.usuarioLogeadoId)
    } catch (error) {
      this.errorService.showError(error)
    }
  }
  async searchUserLogged() {
    try{
      this.userLogged = await this.userService.getUsuarioInfo(
        this.usuarioLogeadoId
      )
    } catch (error) {
      this.errorService.showError(error, "No se pudo obtener la información del usuario logeado del servidor")
    }
  }
  isMisRecomendaciones(): boolean {
    return this.router.url.includes('mis-recomendaciones')
  }
  crearRecomendacion() {
    this.router.navigate(['/edicion-de-recomendacion/new'])
  }
}
