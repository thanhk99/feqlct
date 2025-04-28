import { Component, OnInit } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './login/login.component';
import { NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,LoginComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(
    private router: Router,
    private cookieService: CookieService
  ){}
  ngOnInit(): void {
    if(this.cookieService.get("id") === ''){
      this.router.navigate(['/login']);
    }
  }
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
