import { Component } from '@angular/core';
import { CardLibroComponent } from '../../components/cards/card-libro/card-libro.component'
import { CardRecomendacionComponent } from '../../components/cards/card-recomendacion/card-recomendacion.component'
import { CardValoracionComponent } from '../../components/cards/card-resenia/card-valoracion.component'
import { UserService } from '../../services/usuarios/usuarios.service'
import * as UsuarioInfo from '../../domain/usuario'
import { RouterOutlet } from '@angular/router'
import { amigoJSON, amigo } from '../../domain/amigos'
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  imports: [
    RouterOutlet,
    CardLibroComponent,
    CardRecomendacionComponent,
    CardValoracionComponent,
  ],
})
export class PerfilComponent {
  usuario : UsuarioInfo.UsuarioDTO | undefined
  
  constructor(
    private UserService: UserService,
    private AuthService : AuthService
  ){}
  
  async ngOnInit(){
    this.usuario = await this.UserService.getUsuario(Number(this.AuthService.getUserLogedID()))
    
  }

  
  getUserLogedID(): number | null {
    return Number(this.AuthService.getUserLogedID());
  }
  

  async confirmarCambios(usuarioNew : UsuarioInfo.UsuarioDTO){
    this.usuario = usuarioNew
    const tipoPerfil : String[] = []
    usuarioNew.tipoPerfil?.forEach(element => {tipoPerfil.push(element.constructor.name)});
    const usuarioNewJSON : UsuarioInfo.UsuarioDTOJSON = {
      userName: usuarioNew.userName,
      name: usuarioNew.name,
      lastName: usuarioNew.lastName,
      email: usuarioNew.email,
      birthdate: usuarioNew.birthdate,
      avgTime: usuarioNew.avgTime,
      tipoLector: usuarioNew.tipoLector?.constructor.name,
      tipoPerfil: tipoPerfil,
      limMin: usuarioNew.limMin,
      limMax: usuarioNew.limMax,
      id: usuarioNew.id

    }
      
    console.log(usuarioNewJSON)
    await this.UserService.editarUsuario(usuarioNewJSON, usuarioNewJSON.id!)
    await this.UserService.getUsuario
    (Number(this.AuthService.getUserLogedID()))
  }
}
