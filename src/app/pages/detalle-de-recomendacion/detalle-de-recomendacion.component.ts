import { Component, OnInit } from '@angular/core'
import { CardValoracionComponent } from '../../components/cards/card-resenia/card-valoracion.component'
import { CardFlexContainerComponent } from '../../components/card-flex-container/card-flex-container.component'
import { CardLibroComponent } from '../../components/cards/card-libro/card-libro.component'
import { Recomendacion } from '../../domain/recomendacion'
import { RecomendacionesService } from '../../services/recomendaciones/recomendaciones.service'
import { ActivatedRoute, Router } from '@angular/router'
import { ButtonComponent } from '../../components/button/button.component'
import { ModalAddValoracionComponent } from '../../components/modal-add-valoracion/modal-add-valoracion.component'
import { Valoracion } from '../../domain/valoracion'
import { AlertComponent } from '../../components/alert/alert.component'
import { NgClass } from '@angular/common'
import { ErrorHandlerService } from '../../services/error/error-handler.service'
import { ValoracionJSON } from '../../domain/valoracion'
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-detalle-de-recomendacion',
  standalone: true,
  imports: [
    CardValoracionComponent,
    CardFlexContainerComponent,
    CardLibroComponent,
    ModalAddValoracionComponent,
    ButtonComponent,
    AlertComponent,
    NgClass
  ],
  templateUrl: './detalle-de-recomendacion.component.html',
  styleUrl: './detalle-de-recomendacion.component.css'
})
export class DetalleDeRecomendacionComponent implements OnInit {
  valoracion: Valoracion | undefined
  isModalOpen: boolean = false
  recomendacion: Recomendacion | undefined
  valoracionJSON: ValoracionJSON | undefined
  usuarioLogeadoId!: number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
    private recomendacionesService: RecomendacionesService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const idRecomendacion = this.route.snapshot.paramMap.get('id')
    this.usuarioLogeadoId = Number(this.authService.getUserLogedID())

    try {
      this.recomendacion =
        await this.recomendacionesService.getRecomendacionById(
          Number(idRecomendacion)
        )
      console.log(this.recomendacion)
    } catch (error) {
      this.errorHandlerService.showError(error)
    }
  }

  openModal() {
    this.isModalOpen = true
  }

  closeModal() {
    this.isModalOpen = false
  }

  onSaveValoracion(valoracion: Valoracion) {
    this.addValoracion(valoracion)
  }

  async addValoracion(valoracion: Valoracion) {
    this.valoracionJSON = valoracion.toJSON()

    try {
      const recomendacionActualizada =
        await this.recomendacionesService.addValoracionToRecomendacion(
          this.recomendacion?.id,
          this.valoracionJSON
        )
      this.recomendacion = recomendacionActualizada
      this.closeModal()
      this.errorHandlerService.showSuccess('Valoracion agregada con éxito')
    } catch (error) {
      this.errorHandlerService.showError(error)
    }
  }

  //Vuelvo a la pagina anterior
  goBack() {
    const previousUrl = sessionStorage.getItem('previousUrl')
    if (previousUrl) {
      this.router.navigateByUrl(previousUrl) // Navegar a la última URL guardada
    }
  }
}
