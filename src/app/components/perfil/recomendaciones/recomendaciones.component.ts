import { Component } from '@angular/core'
import { CardRecomendacionComponent } from "../../cards/card-recomendacion/card-recomendacion.component";
import { Recomendacion } from '../../../domain/recomendacion';
import { Libro } from '../../../domain/libro';
import { UserInfo } from '../../../domain/usuario';
import { RecomendacionesService } from '../../../services/recomendaciones/recomendaciones.service';
import { UserService } from '../../../services/usuarios/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { ErrorHandlerService } from '../../../services/error/error-handler.service';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css'],
  standalone: true,
  imports: [CardRecomendacionComponent

  ]
})
export class PerfilRecomendacionesComponent {
  recomendacionABuscar = ''
  recomendaciones: Recomendacion[] = []
  libros: Libro[] = []
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

  async onDeleteRecomendation(id: number) {
    try {
      console.log('llegue delete')
      await this.recomendacionesService.deleteRecomendacion(id)
      this.errorService.showSuccess('Recomendacion eliminada correctamente')
    } catch (error) {
      this.errorService.showError(error)
    }
  }

  async ngOnInit(): Promise<void> {
    this.usuarioLogeadoId = Number(this.authService.getUserLogedID())
    this.recomendaciones = await this.userService.getRecomendacionesAVAlorar(Number(this.authService.getUserLogedID()))
    this.searchUserLogged()
  }

  async searchUserLogged() {
    this.userLogged = await this.userService.getUsuarioInfo(
      this.usuarioLogeadoId
    )
    console.log(this.userLogged)
  }
}
