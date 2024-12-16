import { Component, EventEmitter, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavbarComponent } from '../navbar/navbar.component'
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarComponent]
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  get userName(): string | null {
    return this.authService.userName;
  }

  getUserLogedID(): number | null {
    return Number(this.authService.getUserLogedID());
  }

  @Output() toggleNavbarEvent = new EventEmitter<void>()

  toggleNavbar() {
    this.toggleNavbarEvent.emit()
  }
} 
