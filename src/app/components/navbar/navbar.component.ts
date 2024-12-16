import { Component, Input } from '@angular/core'
import { AuthService } from '../../services/auth/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() isNavbarVisible: boolean = false

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogout() {
    this.authService.logout();  
    this.router.navigate(['/login']); 
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  toBusqueda() {
    this.router.navigate(['/busqueda-principal'])
  }

  toPerfil() {
    this.router.navigate(['/perfil'])
  }

  toMisRecomendaciones() {
    this.router.navigate(['/mis-recomendaciones'])
  }
}
