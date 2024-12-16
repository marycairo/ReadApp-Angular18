import { Component, Input } from '@angular/core'
import { Valoracion } from '../../../domain/valoracion'
import { AuthService } from '../../../services/auth/auth.service'

@Component({
  selector: 'app-card-valoracion',
  standalone: true,
  imports: [],
  templateUrl: './card-valoracion.component.html',
  styleUrl: './card-valoracion.component.css'
})
export class CardValoracionComponent {
  usuarioLogeado: number | null = null
  @Input() valoracion!: Valoracion | undefined

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usuarioLogeado = Number(this.authService.getUserLogedID())
  }
}
