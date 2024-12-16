import { Component } from '@angular/core'
import { CardAmigoComponent } from '../../cards/card-amigo/card-amigo.component'
import { UserInfo } from '../../../domain/usuario'
import { amigo } from '../../../domain/amigos'
import { UserService } from '../../../services/usuarios/usuarios.service'
import { AuthService } from '../../../services/auth/auth.service'
import { ButtonComponent } from '../../button/button.component'
import { FormsModule } from '@angular/forms'

@Component({
  imports: [CardAmigoComponent, ButtonComponent, FormsModule],
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.css'],
  standalone: true
})
export class PerfilAmigosComponent {
  usuario!: UserInfo
  amigos: amigo[] | undefined
  nombreAmigo: string = ''

  constructor(
    private UserService: UserService,
    private AuthService: AuthService
  ) {}

  async ngOnInit() {
    this.amigos = await this.UserService.getAmigos(
      Number(this.AuthService.getUserLogedID())
    )
    console.log(this.amigos)
  }

  async agregarAmigo() {
    await this.UserService.agregarAmigo(
      this.nombreAmigo,
      Number(this.AuthService.getUserLogedID())
    )
    this.amigos = await this.UserService.getAmigos(
      Number(this.AuthService.getUserLogedID()))
  }
}
