import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasUserLogedID());
  loggedIn$ = this.loggedInSubject.asObservable();
  userName: string | null = null;

  constructor(private userService: UserService) {}

  login(userLogedID: number, userName: string) {
    localStorage.setItem('userLogedID', userLogedID.toString());  
    this.loggedInSubject.next(true);
    this.userName = userName;  
  }

  logout() {
    localStorage.removeItem('userLogedID');  
    this.loggedInSubject.next(false);
    this.userName = null;  
  }

  hasUserLogedID(): boolean {
    return !!localStorage.getItem('userLogedID');
  }

  getUserLogedID(): string | null {
    return localStorage.getItem('userLogedID');
  }

  isAuthenticated(): boolean {
    return this.hasUserLogedID();
  }
}
