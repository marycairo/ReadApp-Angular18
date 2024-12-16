import { Component } from '@angular/core'
import { CardLibroComponent } from '../../cards/card-libro/card-libro.component'
import { AuthService } from '../../../services/auth/auth.service'
import { Libro } from '../../../domain/libro'
import { UserService } from '../../../services/usuarios/usuarios.service'

@Component({
  selector: 'app-libros-leidos',
  templateUrl: './libros-leidos.component.html',
  styleUrls: ['./libros-leidos.component.css'],
  standalone: true,
  imports: [CardLibroComponent]
})
export class PerfilLibrosLeidosComponent {
  usuarioLogeadoID: Number | null = null
  librosLeidos: Array<Libro> | undefined

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.usuarioLogeadoID = Number(this.authService.getUserLogedID())
    this.librosLeidos = await this.getLibrosLeidos()
  }

  async getLibrosLeidos(): Promise<Libro[]> {
    this.librosLeidos = await this.userService.getLibrosLeidos(
      this.usuarioLogeadoID
    )
    console.log(this.librosLeidos)
    return this.librosLeidos  
  }
}
