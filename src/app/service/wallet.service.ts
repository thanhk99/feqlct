import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private http: HttpClient
  ) { }
  addWallet(idUser:any,nameWallet:any,currency:any,balance:any){
    const body={
      "idUser":idUser,
      "nameWallet":nameWallet,
      "currency":currency,
      "balance":balance
    } 
    return this.http.post('http://127.0.0.1:8083/wallet/create',body)
  }
  deleteWallet(idWallet:any){
    const body={id:idWallet}
    return this.http.post('http://127.0.0.1:8083/wallet/delete',body)
  }
  updateBalance(id:number,amount:number){
    const body={
      "id":id,
      "balance":amount
    }
    return this.http.post('http://127.0.0.1:8083/wallet/updateBalance',body)
  }
  getWallet(id :any){
    const body={
      "id":id
    }
    return this.http.post('http://127.0.0.1:8083/wallet/getWallet',body)
  }
}
