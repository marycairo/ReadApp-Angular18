import { Component, Input, Output, EventEmitter, input,  } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor-titulo',
  templateUrl: './editor-titulo.component.html',
  styleUrls: ['./editor-titulo.component.css'],
  standalone: true,
  imports: [FormsModule] 

})
export class EditorTituloComponent {
  @Input() titulo: string | undefined;
  @Output() tituloChange = new EventEmitter<string>()
  @Input() publico: boolean | undefined
  @Output() publicoChange = new EventEmitter<boolean>()


  onTituloChange(nuevoTitulo: string) {
    this.tituloChange.emit(nuevoTitulo)
  }
  
  onPublicoChange(publico: boolean) {
    this.publicoChange.emit(publico)
  }
}
