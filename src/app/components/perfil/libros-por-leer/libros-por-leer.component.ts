import { Component } from '@angular/core'
import { CardLibroComponent } from '../../cards/card-libro/card-libro.component'
import { AuthService } from '../../../services/auth/auth.service'
import { UserService } from '../../../services/usuarios/usuarios.service'
import { Libro } from '../../../domain/libro'

@Component({
  selector: 'app-libros-por-leer',
  templateUrl: './libros-por-leer.component.html',
  styleUrls: ['./libros-por-leer.component.css'],
  standalone: true,
  imports: [CardLibroComponent]
})
export class PerfilLibrosPorLeerComponent {
  usuarioLogeadoID: Number | null = null
  librosALeer: Array<Libro> | undefined

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.usuarioLogeadoID = Number(this.authService.getUserLogedID())
    this.librosALeer = await this.getLibrosALeer()
  }

  async getLibrosALeer(): Promise<Libro[]> {
    this.librosALeer = await this.userService.getLibrosALeer(
      this.usuarioLogeadoID
    )
    console.log(this.librosALeer)
    return this.librosALeer
  }
}
