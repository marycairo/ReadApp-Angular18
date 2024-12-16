import { NgClass } from '@angular/common'
import { Component, Input } from '@angular/core'
import { ErrorHandlerService } from '../../services/error/error-handler.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() type: 'success' | 'error' | '' = ''
  @Input() message: string = ''
  private errorSubscription!: Subscription
  private successSubscription!: Subscription

  constructor(private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    //se suscribirse al servicio de manejo de errores
    this.errorSubscription = this.errorHandlerService.error$.subscribe(
      (errorMessage) => {
        this.message = errorMessage
        this.type = 'error'
        this.clearMessageAfterTimeout()
      }
    )

    this.successSubscription = this.errorHandlerService.success$.subscribe(
      (successMessage) => {
        this.message = successMessage
        this.type = 'success'
        this.clearMessageAfterTimeout()
      }
    )
  }

  ngOnDestroy(): void {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe()
    }
  }

  clearMessageAfterTimeout() {
    setTimeout(() => {
      this.message = ''
    }, 5000) //limpia el mensaje después de 5 segundos
  }

  getAlertClass() {
    return {
      alert: true,
      'alert-success': this.type === 'success',
      'alert-error': this.type === 'error'
    }
  }
}
