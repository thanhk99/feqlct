import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }
  addTrans(idWallet:number,type:any,amount:number,spent:any,time:any){
    let idUser=this.userService.getCookieID()
    const body={
      "idUser":idUser,
      "idWallet":idWallet,
      "type":type,
      "amount":amount,
      "spent":spent,
      "time":time
    }
    return this.http.post('http://127.0.0.1:8083/transaction/save',body)
  }
  getHisTrans(idUser:any){
    const body={idUser:idUser}
    return this.http.post('http://127.0.0.1:8083/transaction/getHisTrans',body)
  }
  getTotalByDate(type:any){
    const body={    
      "idUser":this.userService.getCookieID(),
      "type":type
    }
    return this.http.post('http://localhost:8083/transaction/staticsExpense',body)
  }
  getTotalByMonth(type:any){
    const body={    
      "idUser":this.userService.getCookieID(),
      "type":type
    }
    return this.http.post('http://localhost:8083/transaction/staticsExpenseMonth',body)
  }
  getTotalByWallet(type:any){
    const body={    
      "idUser":this.userService.getCookieID(),
      "type":type
    }
    return this.http.post('http://localhost:8083/transaction/staticsExpenseWallet',body)
  }
  editItem(transaction:any){
    const body= {
      id:transaction.id,
      type:transaction.type,
      idWallet:transaction.idWallet,
      idUser:transaction.idUser,
      amount:transaction.amount,
      spent:transaction.spent,
      time:transaction.time
    };
    return this.http.post("http://127.0.0.1:8083/transaction/edit", body);
  }
  deleteItem(transaction:any){
    const body= {
      id:transaction.id,
      type:transaction.type,
      idWallet:transaction.idWallet,
      amount:transaction.amount,
    };
    return this.http.post("http://127.0.0.1:8083/transaction/edit", body);
  }
}
