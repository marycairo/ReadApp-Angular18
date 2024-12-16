import { Component, EventEmitter, Input, Output  } from '@angular/core'
import { amigo } from '../../../domain/amigos'
import { AuthService } from '../../../services/auth/auth.service'
import { UserService } from '../../../services/usuarios/usuarios.service'

@Component({
  selector: 'app-card-amigo',
  templateUrl: './card-amigo.component.html',
  styleUrl: './card-amigo.component.css',
  standalone: true,
  imports: []
})
export class CardAmigoComponent {
  @Input() amigo!: amigo

  constructor(
    private AuthService: AuthService,
    private UserService: UserService
  ) {}

  async borrarUsuario(){
    await this.UserService.removeAmigo(Number(this.AuthService.getUserLogedID()),Number(this.amigo.id))
    window.location.reload();
  }
}
