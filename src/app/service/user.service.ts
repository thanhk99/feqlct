import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { get } from 'node:http';
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
    "account":tk,
    "password":mk
    }
    return this.http.post('http://127.0.0.1:8083/user/login',body)
  }
  logout(){
    this.cookieService.deleteAll()
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
  getWallet(){
    let id=this.getCookieID()
    const body={"idUser":id}
    return this.http.post('http://127.0.0.1:8083/user/wallet' , body)
  }
  updateWallet(id:any,nameWallet:any,balance:number,currency:any){
    let idUser=this.getCookieID()
    const body={
      "id":id,
      "nameWallet":nameWallet,
      "balance":balance,
      "idUser":idUser,
      "currency":currency
    }
    return this.http.post('http://127.0.0.1:8083/wallet/update',body)
  }
}
