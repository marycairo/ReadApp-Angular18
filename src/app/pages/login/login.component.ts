import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { ButtonComponent } from '../../components/button/button.component'
import { AuthService } from '../../services/auth/auth.service'
import { UserService } from '../../services/usuarios/usuarios.service'

interface ErrorMessages {
  [key: string]: {
    [key: string]: string
  }
}

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, ButtonComponent]
})
export class LoginComponent {
  loginForm: FormGroup
  passwordVisible: boolean = false
  submitted: boolean = false
  errorMessage: string = ''

  errorMessages: ErrorMessages = {
    userName: {
      required: 'El nombre de usuario es obligatorio.',
      pattern: 'El nombre de usuario solo puede contener letras y números.'
    },
    password: {
      required: 'La contraseña es obligatoria.'
    }
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      userName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]
      ],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.submitted = true
    this.errorMessage = ''

    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value
      this.userService.login(userName, password).subscribe(
        (response) => this.handleLoginResponse(response, userName),
        (error) => this.handleError(error)
      )
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName)
    return !!(control && control.hasError(errorName) && this.submitted)
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.loginForm.get(controlName)

    if (control && control.errors) {
      const errorKey = Object.keys(control.errors).find(
        (error) => control.errors![error]
      )
      return errorKey ? this.errorMessages[controlName][errorKey] || null : null
    }

    return null
  }

  private handleLoginResponse(response: any, userName: string) {
    if (response && response.userLogedID) {
      this.authService.login(response.userLogedID, userName)
      this.router.navigate(['/busqueda-principal'])
    }
  }

  private handleError(error: any) {
    if (error.status === 0) {
      this.errorMessage =
        'No se puede conectar al servidor. Por favor, intenta más tarde.'
    } else {
      this.errorMessage = error.error.message
    }
  }
}
