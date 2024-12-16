import { Component, Input, output } from '@angular/core'
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
  selector: 'app-modal-delete-rec',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, AlertComponent, NgIf],
  templateUrl: './modal-delete-rec.component.html',
  styleUrl: './modal-delete-rec.component.css'
})
export class ModalDeleteRecComponent {
  public close = output<void>()
  public accion = output<void>()
  @Input() message: string = ''

  constructor() {}

  onClose() {
    console.log('close')
    this.close.emit()
  }
  onSave() {
    console.log('delete')
    this.accion.emit()
    this.onClose()
  }
}
