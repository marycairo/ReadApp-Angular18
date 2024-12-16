import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Autor, Libro } from '../../../domain/libro'

@Component({
  selector: 'app-card-libro',
  templateUrl: './card-libro.component.html',
  styleUrl: './card-libro.component.css',
  standalone: true,
  imports: []
})
export class CardLibroComponent {
  @Input() showDeleteButton: boolean = true
  @Input() libro!: Libro
  @Output() libroDeleted = new EventEmitter<number>() 

  deleteLibro() {
    if (this.libro) {
      this.libroDeleted.emit(this.libro.id)
    }
  }
  

}
