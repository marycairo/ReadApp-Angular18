import { Component, input } from '@angular/core'
import * as UsuarioInfo from '../../../domain/usuario'
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/usuarios/usuarios.service'
import { PerfilComponent } from '../../../pages/perfil/perfil.component';
import { AuthService } from '../../../services/auth/auth.service';
import { isEmpty } from 'rxjs';



@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class PerfilInfoComponent {  
  usuario = new UsuarioInfo.UsuarioDTO
  promedio = new UsuarioInfo.Promedio
  ansioso = new UsuarioInfo.Ansioso
  fanatico = new UsuarioInfo.Fanatico
  recurrente = new UsuarioInfo.Recurrente
  precavido = new UsuarioInfo.Precavido
  leedor = new UsuarioInfo.Leedor
  poliglota = new UsuarioInfo.Poliglota
  demandante = new UsuarioInfo.Demandante
  nativista = new UsuarioInfo.Nativista
  experimentado = new UsuarioInfo.Experimentado
  cambiante = new UsuarioInfo.Cambiante
  calculador = new UsuarioInfo.Calculador
  unchangedFlag = true
  

  constructor(
    private perfil : PerfilComponent,
    private service : UserService,
    private AuthService : AuthService,
   
  ){
  }

  guardar(){
    if (this.checkVacios() && this.isEmail(this.usuario.email!)){
    this.perfil.confirmarCambios(
      new UsuarioInfo.UsuarioDTO(this.usuario.userName, this.usuario?.name, this.usuario.lastName, this.usuario.email, this.usuario.birthdate, this.usuario.avgTime, this.usuario.tipoLector, this.usuario.tipoPerfil, this.usuario.limMin, this.usuario.limMax, Number(this.AuthService.getUserLogedID())))
      this.unchangedFlag = true
    }else {
      alert("Existen campos incompletos o invalidos")
      
    }
  }
  cancelar(){}

  aniadirACriterioBusqueda(criterio : UsuarioInfo.CriterioBusqueda) {
    const tiposDePerfil : UsuarioInfo.CriterioBusqueda[] = []
    
    if (this.usuario.tipoPerfil?.includes(criterio)){
      this.usuario.tipoPerfil?.splice(this.usuario.tipoPerfil?.indexOf(criterio,0),1)
    }
    else this.usuario.tipoPerfil?.push(criterio) 
    console.log(this.usuario.tipoPerfil)  
  }
  
  getCheckbox(check : UsuarioInfo.CriterioBusqueda){ 
    
    if (this.usuario.tipoPerfil?.includes(check)){
      
      return true
    }else return false
  }

  async ngOnInit() {
    const usuarioAux = await this.service.getUsuario(Number(this.AuthService.getUserLogedID()))
    this.usuario = usuarioAux! 
    usuarioAux?.tipoPerfil?.forEach(element => {
      this.usuario.tipoPerfil?.splice(this.usuario.tipoPerfil?.indexOf(element,0),1)
      this.usuario.tipoPerfil?.push(this.getTipoPerfil(element))
   
   });


    
    const tipoDeLector={
      LectorPromedio: this.promedio,
      Ansioso: this.ansioso,
      Fanatico : this.fanatico,
      Recurrente: this.recurrente,
    }
    
    this.usuario.tipoLector = tipoDeLector[this.usuario.tipoLector?.tipoLectorString() as keyof typeof tipoDeLector]

    window.onbeforeunload = () => this.unchangedFlag
    
  }

  checkVacios(){
    const campos = [this.usuario.userName, this.usuario.name, this.usuario.lastName, this.usuario.birthdate, this.usuario.email, this.usuario.avgTime, this.usuario.limMin, this.usuario.limMax]
    if(campos.some(campo => !campo)){return false} else {return true}
  }


  getTipoPerfil(tipoPerfil : UsuarioInfo.CriterioBusqueda){
    const tipoDePerfil={
      Precavido : this.precavido,
      Leedor : this.leedor,
      Poliglota : this.poliglota,
      Demandante: this.demandante,
      Nativista: this.nativista,
      Experimentado: this.experimentado,
      Cambiante: this.cambiante,
      Calculador: this.calculador
    }
    console.log(tipoPerfil.tipoPerfilString())
    return tipoDePerfil[tipoPerfil.tipoPerfilString() as keyof typeof tipoDePerfil]
    
  }

  isEmail(search:string):boolean
    {
        var  serchfind:boolean;

        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        serchfind = regexp.test(search);

        console.log(serchfind)
        return serchfind
    }

  


}


