import { Component, EventEmitter, Input, input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-editor-resenia',
  templateUrl: './editor-resenia.component.html',
  styleUrl: './editor-resenia.component.css',
  standalone: true,
  imports: [FormsModule]
})
export class EditorReseniaComponent {
  @Input() detalle: string | undefined
  @Output() detalleChange = new EventEmitter<string>()

  onDetalleChange(nuevoDetalle: string){
    this.detalleChange.emit(nuevoDetalle)
  }
}
