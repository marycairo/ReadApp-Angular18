import { Component, OnInit } from '@angular/core'
import { CardLibroComponent } from '../../components/cards/card-libro/card-libro.component'
import { CardRecomendacionComponent } from '../../components/cards/card-recomendacion/card-recomendacion.component'
import { EditorReseniaComponent } from './components/editor-resenia/editor-resenia.component'
import { EditorTituloComponent } from './components/editor-titulo/editor-titulo.component'
import { CardValoracionComponent } from '../../components/cards/card-resenia/card-valoracion.component'
import { ButtonComponent } from '../../components/button/button.component'
import { ActivatedRoute, Router } from '@angular/router'
import { RecomendacionesService } from '../../services/recomendaciones/recomendaciones.service'
import { Recomendacion } from '../../domain/recomendacion'
import { Libro } from '../../domain/libro'
import { LibrosService } from '../../services/libros/libros.service'
import { FormsModule } from '@angular/forms'
import { RecomendacionEdit } from '../../domain/recomendacionedit'
import { ErrorHandlerService } from '../../services/error/error-handler.service'
import { AlertComponent } from '../../components/alert/alert.component'
import { AuthService } from '../../services/auth/auth.service'
import { ModalDeleteRecComponent } from "../../components/modal-delete-rec/modal-delete-rec.component";

@Component({
  selector: 'app-edicion-de-recomendacion',
  standalone: true,
  templateUrl: './edicion-de-recomendacion.component.html',
  styleUrls: ['./edicion-de-recomendacion.component.css'],
  imports: [
    CardLibroComponent,
    CardRecomendacionComponent,
    EditorReseniaComponent,
    EditorTituloComponent,
    CardValoracionComponent,
    ButtonComponent,
    FormsModule,
    AlertComponent,
    ModalDeleteRecComponent
]
})
export class EdicionDeRecomendacionComponent implements OnInit {
  recomendacion: Recomendacion | undefined
  libros: Libro[] = []
  librosNuevos: Libro[] = []
  librosTemporales: Libro[] = []

  nuevoNombre: string = ''
  nuevoDetalle: string = ''
  esPublico: boolean = false
  errorMessage: string = ''
  alertType: 'success' | 'error' = 'success'
  alta: boolean = false
  isModalOpen: boolean = false


  constructor(
    private route: ActivatedRoute,
    public recomendacionesService: RecomendacionesService,
    public librosService: LibrosService,
    private router: Router,
    private errorService: ErrorHandlerService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const idRecomendacion = this.route.snapshot.paramMap.get('id')
    this.alta = idRecomendacion === 'new'
    if (this.alta) {
      this.nuevoNombre = ''
      this.nuevoDetalle = ''
      this.librosTemporales = []
      this.esPublico = false
    } else {
      await this.obtenerRecomendacion(Number(idRecomendacion))
    }

    const libroSeleccionado = history.state?.libroSeleccionado
    const idsLibrosExistentes = this.librosTemporales.map((libro) => libro.id)
    console.log(idsLibrosExistentes)
    try{
    if (idsLibrosExistentes.includes(libroSeleccionado.id)) {
      const error = {
        error: { message: 'Se intentó seleccionar un libro ya existente.' }
      }
      this.errorService.showError(
        error,'El libro seleccionado ya esta en la lista. ¡Elija otro!')
    } else {
      this.agregarLibroSeleccionado(Libro.fromJSON(libroSeleccionado))
    }
    }
    catch{}
  }

  agregarLibroSeleccionado(libro: Libro) {
    this.nuevoNombre = history.state.nuevoNombre
    this.nuevoDetalle = history.state.nuevoDetalle
    this.esPublico = history.state.esPublico
    this.librosTemporales = history.state.librosTemporales
    console.log(
      'libros temporales al llegar de busqueda de libros :',
      this.librosTemporales
    )

    this.librosNuevos.push(libro.copy())
    this.fusionar()
    this.errorService.showSuccess(
      '¡Libro seleccionado con éxito! (Presione "Guardar" para aplicar los cambios).'
    )
    history.replaceState({}, '', this.router.url)
  }

  fusionar() {
    this.librosTemporales = this.libros
      .map((libro) => libro.copy())
      .concat(this.librosNuevos)
  }

  async obtenerRecomendacion(id: number) {
    try {
      this.recomendacion =
        await this.recomendacionesService.getRecomendacionById(id)
      if (this.recomendacion) {
        this.nuevoNombre = this.recomendacion.nombre || ''
        this.nuevoDetalle = this.recomendacion.detalle || ''
        this.libros = this.recomendacion.librosRecomendados || []
        this.esPublico = this.recomendacion.publico || false
        this.fusionar()
      }
    } catch (error) {
      this.errorService.showError(error)
    }
  }

  eliminarLibro(idLibro: number) {
    this.librosTemporales = this.librosTemporales.filter(
      (libro) => libro.id !== idLibro
    )
    this.errorService.showSuccess(
      '¡Libro extraído de la lista con éxito! (Presione "Guardar" para aplicar los cambios).'
    )
  }

  agregarLibro() {
    const idRecomendacion = this.route.snapshot.paramMap.get('id')
    this.router.navigate(['/busqueda-de-libros'], {
      state: {
        idRecomendacion,
        nuevoNombre: this.nuevoNombre,
        nuevoDetalle: this.nuevoDetalle,
        esPublico: this.esPublico,
        librosTemporales: this.librosTemporales.map((libro: Libro) =>
          libro.copy()
        )
      }
    })
  }

  async guardarCambios() {
    const idCreador = Number(this.authService.getUserLogedID())
    const recomendacionUpdate: RecomendacionEdit = {
      nombre: this.nuevoNombre,
      detalle: this.nuevoDetalle,
      librosRecomendados: this.librosTemporales,
      publico: this.esPublico
    }

    if (this.alta) {
      try {
        console.log("lo que envio al backend:", idCreador, recomendacionUpdate)
        await this.recomendacionesService.crearRecomendacion(idCreador, recomendacionUpdate)
        this.router.navigate(['busqueda-principal'])
      } catch (error) {
        this.errorService.showError(error)
      }
    } else {
      try {
        const idRecomendacion = Number(this.route.snapshot.paramMap.get('id'))
        await this.recomendacionesService.editarRecomendacion(
          idRecomendacion,
          recomendacionUpdate
        )
        this.errorService.showSuccess('Recomendacion Actualizada correctamente')
        this.obtenerRecomendacion(idRecomendacion)
        this.librosNuevos = []
      } catch (error) {
        this.errorService.showError(error)
      }
    }
  }

  volver() {
    if (this.alta) {
      this.router.navigate(['/mis-recomendaciones'])
    } else {
      this.router.navigate(['/busqueda-principal'])
    }
  }


  openModal() {
    this.isModalOpen = true
  }
  closeModal() {
    console.log("close por card")
    this.isModalOpen = false
  }
}
