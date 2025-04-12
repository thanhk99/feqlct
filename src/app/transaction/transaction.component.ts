import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  imports: [NgFor,NgIf,FormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {
  showMenu: boolean[] = [];
  isActive: boolean[] = [];
  isEditing: boolean[] = []; 
  tempItem: any = null;
  data=[
    {id:1,category:'Ăn uống',Wallet:'Atm',Amount:20000,date:'12/04/2025'},
    {id:2,category:'Ăn uống',Wallet:'Atm',Amount:20000,date:'12/04/2025'},
    {id:3,category:'Ăn uống',Wallet:'Atm',Amount:20000,date:'12/04/2025'},
    {id:4,category:'Ăn uống',Wallet:'Atm',Amount:20000,date:'12/04/2025'},
    {id:5,category:'Ăn uống',Wallet:'Atm',Amount:20000,date:'12/04/2025'},
    {id:6,category:'Ăn uống',Wallet:'Atm',Amount:20000,date:'12/04/2025'}
  ]
  constructor() { 
    this.data.forEach(() => {
      this.showMenu.push(false);
      this.isActive.push(false); 
      this.isEditing.push(false);
    })
  }
  Edit(id:any){
  }
  ngOnInit(): void {
    this.showMenu = new Array(this.data.length).fill(false);
  }
  toggleMenu(index: number) {
    if (this.isActive[index]) {
      this.isActive[index] = false;
      this.showMenu[index] = false;
    } else {
      this.isActive = this.isActive.map(() => false);
      this.showMenu = this.showMenu.map(() => false);

      this.isActive[index] = true;
      this.showMenu[index] = true;
    }
  }
  editItem(index: number) {
    // Chuyển hàng sang chế độ chỉnh sửa
    this.isEditing[index] = true;
    // Lưu dữ liệu tạm thời để có thể hủy chỉnh sửa nếu cần
    this.tempItem = { ...this.data[index] };
    this.showMenu[index] = false; // Ẩn menu
    this.isActive[index] = false; // Tắt sáng
  }
  saveItem(index: number) {
    // Lưu dữ liệu và thoát chế độ chỉnh sửa
    this.isEditing[index] = false;
    this.tempItem = null; // Xóa dữ liệu tạm
  }

  cancelEdit(index: number) {
    // Hủy chỉnh sửa, khôi phục dữ liệu ban đầu
    this.data[index] = { ...this.tempItem };
    this.isEditing[index] = false;
    this.tempItem = null; // Xóa dữ liệu tạm
  }
  deleteItem(index: number) {
    console.log('Xóa mục:', this.data[index]);
    this.data.splice(index, 1);
    this.showMenu.splice(index, 1);
    this.isActive.splice(index, 1);
    this.isEditing.splice(index, 1);
  }
}
