import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ){}
  Account ="";
  Password ="";
  isLogin : boolean=false;
  ngOnInit(): void {
    if(this.userService.getCookieID() !=='' ){
      this.router.navigate(['/']);
    }
  }

  ngLogin() {
    this.userService.login(this.Account,this.Password).subscribe(
      (data:any)=>{
        this.userService.setCookieID(data.id)
        this.userService.setCookiedName(data.fullname)
        this.router.navigate(['/']);
      },
      (error:any)=>{
        console.log(error);
      }
    )
  }
}
