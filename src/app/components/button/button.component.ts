import { NgClass } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() buttonClass: string = 'boton-principal'
  @Input() buttonText: string = ''
  @Input() disabled: boolean = false
  @Input() type: string = 'button'
  @Output() clickEvent = new EventEmitter<void>()

  onClick() {
    this.clickEvent.emit()
  }
}
