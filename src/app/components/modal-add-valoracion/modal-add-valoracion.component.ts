import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms'
import { ButtonComponent } from '../button/button.component'
import { Valoracion } from '../../domain/valoracion'
import { ErrorHandlerService } from '../../services/error/error-handler.service'
import { AlertComponent } from '../alert/alert.component'
import { NgIf } from '@angular/common'
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-modal-add-valoracion',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, AlertComponent, NgIf],
  templateUrl: './modal-add-valoracion.component.html',
  styleUrls: ['./modal-add-valoracion.component.css']
})
export class ModalAddValoracionComponent {
  valoracionForm: FormGroup

  @Output() close = new EventEmitter<void>()
  @Output() save = new EventEmitter<Valoracion>()

  constructor(
    private fb: FormBuilder,
    private errorHandlerService: ErrorHandlerService,
    private authService: AuthService
  ) {
    const usuario = authService.getUserLogedID()

    this.valoracionForm = this.fb.group({
      usuario: [usuario, Validators.required],
      puntaje: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comentario: ['', Validators.required]
    })
  }

  onSave() {
    if (this.valoracionForm.valid) {
      const valoracionData = this.valoracionForm.value
      const valoracion: Valoracion = new Valoracion(
        valoracionData.usuario,
        valoracionData.puntaje,
        valoracionData.comentario
      )
      console.log(valoracion)
      this.save.emit(valoracion)
    } else {
      this.errorHandlerService.showError(
        null,
        'Por favor, complete los campos correctamente.'
      )
    }
  }

  onClose() {
    this.close.emit()
  }
}
