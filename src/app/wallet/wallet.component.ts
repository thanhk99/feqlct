import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { WalletService } from '../service/wallet.service';
@Component({
  selector: 'app-wallet',
  imports: [NgFor, FormsModule,NgIf],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  accounts = [
    {id:0,nameWallet: 'Ví', balance:0,currency:'',isEditing: false }
  ];
  tempCurrency=''
  currencys=[
    {name:'USD',value:'USD'},
    {name:'VND',value:'VND'},
    {name:'EUR',value:'EUR'},
  ]
  selectCurrency:string='';
  newAccount = {
    nameWallet: '',
    balance:0,
    lastUsed: new Date().toLocaleDateString('vi-VN') // Ngày hiện tại
  };

  constructor(
    private userService: UserService,
    private walletService: WalletService
  ) { }
  ngOnInit(): void {
    this.userService.getWallet().subscribe(
      (data: any) => {
        this.accounts = data.map((account: any) => ({
          ...account,
          isEditing: false
        }));
      },
      (error: any) => {
        console.error(error);
      }
    )
  }
  // Bắt đầu chỉnh sửa
  startEditing(index: number) {
    this.accounts[index].isEditing = true;
  }

  // Lưu chỉnh sửa
  saveEdit(index: number,id:number,balance:number,nameWallet:any) {
    let tempCurrency=this.accounts[index].currency
    this.accounts[index].isEditing = false;
    this.userService.updateWallet(id,nameWallet,balance,tempCurrency).subscribe()
  }

  // Hủy chỉnh sửa
  cancelEdit(index: number) {
    this.accounts[index].isEditing = false;
    // Có thể thêm logic để khôi phục dữ liệu cũ nếu cần
  }

  // Xóa tài khoản
  deleteAccount(id: number,index:number) {
    if (confirm('Bạn có chắc chắn muốn xóa ví này không?')) {
      this.accounts.splice(index, 1);
    }
    this.walletService.deleteWallet(id).subscribe()
  }

  // Hàm thêm tài khoản mới
  addAccount() {
    if (this.newAccount.nameWallet.trim()) {
      this.accounts.push({
        id:0,
        nameWallet: this.newAccount.nameWallet,
        balance: this.newAccount.balance,
        currency:this.selectCurrency,
        isEditing: false
      });
      this.walletService.addWallet(this.userService.getCookieID(),this.newAccount.nameWallet,this.selectCurrency,this.newAccount.balance).subscribe()
      // Reset form sau khi thêm
      this.newAccount = {
        nameWallet: '',
        balance:0,
        lastUsed: new Date().toLocaleDateString('vi-VN')
      };
      location.reload()
    }
  }
}