import { Component } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './login/login.component';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,LoginComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    private router: Router
  ){}
  title = 'admin';
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
