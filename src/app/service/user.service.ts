import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient,
    private cookieService : CookieService,
  ) { }
  login(tk:any,mk:any){
    const body={
      "tk":tk , 
      "mk":mk ,
    }
    return this.http.post('http://localhost:8082/user/login',body)
  }
  setCookieID(id:any){
    this.cookieService.set('id', id);
  }
  getCookieID(){
    return this.cookieService.get('id');
  }
  setCookiedName(name:any){
    this.cookieService.set('name', name);
  }
  getCookiedName(){
    return this.cookieService.get('name')
  }

}
