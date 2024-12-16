import { Component, Input, output } from '@angular/core'
import { Recomendacion } from '../../../domain/recomendacion'
import { Router } from '@angular/router'
import { UserInfo } from '../../../domain/usuario'
import { ModalDeleteRecComponent } from "../../modal-delete-rec/modal-delete-rec.component";

@Component({
  selector: 'app-card-recomendacion',
  standalone: true,
  imports: [ModalDeleteRecComponent],
  templateUrl: './card-recomendacion.component.html',
  styleUrl: './card-recomendacion.component.css'
})
export class CardRecomendacionComponent {
  isModalOpen: boolean = false
  @Input() recomendacion!: Recomendacion
  @Input() usuarioLogeadoId!: number
  @Input() userLogged?: UserInfo
  public onDeleteRecomendation = output<number>();
  public onLikeRecomendation = output<number>();
  
  constructor(private router: Router) {}

  verMas(recomendacion: Recomendacion) {
    this.router.navigate(['/detalle-de-recomendacion', recomendacion.id], {
      state: { recomendacion }
    })
  }

  editarRecomendacion(recomendacion: Recomendacion) {
    this.router.navigate(['/edicion-de-recomendacion', recomendacion.id])
  }
  deleteRecomendation(){
    this.onDeleteRecomendation.emit(this.recomendacion.id!)
  }
  likeRecomendacion(recomendacion: Recomendacion) {
    this.onLikeRecomendation.emit(this.recomendacion.id!)
  }
  openModal() {
    this.isModalOpen = true
  }
  closeModal() {
    console.log("close por card")
    this.isModalOpen = false
  }
}
