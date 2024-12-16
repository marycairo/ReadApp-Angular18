import { Component } from '@angular/core'
import { Router, RouterOutlet, NavigationEnd } from '@angular/router'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './components/header/header.component'
import { AuthService } from './services/auth/auth.service'
import { NavbarComponent } from './components/navbar/navbar.component'
import { ErrorHandlerService } from './services/error/error-handler.service'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, NavbarComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'readapp-grupo-1';
  isLoggedIn: boolean = false;
  private currentUrl: string = '';
  errors: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) {
    this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      if (!this.isLoggedIn) {
        this.isNavbarVisible = false; 
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.currentUrl) {
          sessionStorage.setItem('previousUrl', this.currentUrl);
        }
        this.currentUrl = event.urlAfterRedirects;
      }
    });

    this.errorHandlerService.error$.subscribe((errorMessage) => {
      this.errors.push(errorMessage);
      setTimeout(() => {
        this.errors = [];
      }, 10000);
    });
  }

  isNavbarVisible: boolean = false;

  toggleNavbar() {
    this.isNavbarVisible = !this.isNavbarVisible;
  }

  logout() {
    this.authService.logout();  
    this.router.navigate(['/login']);  
  }
}
