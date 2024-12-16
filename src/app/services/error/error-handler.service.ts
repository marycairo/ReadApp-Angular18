import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private errorSubject = new Subject<string>()
  private successSubject = new Subject<string>()

  error$ = this.errorSubject.asObservable()
  success$ = this.successSubject.asObservable()

  showError(error: any, customMessage?: string): void {
    console.log('llamando al service de error', error)
    const originalError = error?.error ?? error
    let errorMessage = customMessage || originalError.message

    if (error.status === 0) {
      errorMessage =
        'No hay conexión con el backend, revise si el servidor remoto está activo.'
    } else if (error.status === 500) {
      errorMessage =
        'Hubo un error al realizar la operación. Consulte al administrador del sistema.'
      console.error(error)
    }
    this.errorSubject.next(errorMessage)
  }

  showSuccess(message: string): void {
    console.log('Emitiendo mensaje de éxito:', message) // Verifica que se llama
    this.successSubject.next(message)
  }
}
