import { Component } from '@angular/core';
import { AuthService } from './features/auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  currentYear = new Date().getFullYear();

  constructor(public authService: AuthService){}

  logout():void{
    this.authService.logout();
  }
}
