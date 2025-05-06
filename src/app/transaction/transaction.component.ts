import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { TransactionService } from '../service/transaction.service';
import { WalletService } from '../service/wallet.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  showMenu: boolean[] = [];
  isActive: boolean[] = [];
  isEditing: boolean[] = [];
  tempItem: any = null;

  data = [{ id: 1, category: 'Ăn uống', Wallet: 'Atm', Amount: 20000, date: '12/04/2025', nameWallet: '' }];

  // Phân trang
  currentPage: number = 1;
  itemsPerPage: number = 5; // Số lượng giao dịch mỗi trang
  totalPages: number = 1;
  paginatedData: any[] = [];

  constructor(
    private userService: UserService,
    private transactionService: TransactionService,
    private walletService: WalletService
  ) {
    this.updatePagination();
  }

  ngOnInit(): void {
    this.transactionService.getHisTrans(this.userService.getCookieID()).subscribe(
      (data: any) => {
        // Ánh xạ dữ liệu giao dịch và thêm nameWallet
        this.data = data.map((item: any) => ({
          id: item.id,
          type: item.type || item.category,
          idWallet: item.idWallet || item.Wallet,
          amount: item.amount || item.Amount,
          time: item.time,
          nameWallet: '' // Khởi tạo nameWallet rỗng ban đầu
        }));
        // Gọi hàm để lấy nameWallet cho từng giao dịch
        this.fetchWalletNames();
        this.updatePagination();
      },
      (error: any) => {
        console.error('Lỗi khi lấy dữ liệu giao dịch:', error);
      }
    );
  }

  // Hàm lấy nameWallet cho tất cả giao dịch
  fetchWalletNames() {
    this.data.forEach((item: any, index: number) => {
      if (item.idWallet) {
        this.getNameWallet(item.idWallet).subscribe(
          (nameWallet: string) => {
            this.data[index].nameWallet = nameWallet;
            this.updatePagination(); // Cập nhật lại phân trang để hiển thị nameWallet
          },
          (error: any) => {
            console.error(`Lỗi khi lấy nameWallet cho Wallet ID ${item.Wallet}:`, error);
            this.data[index].nameWallet = 'Không xác định';
            this.updatePagination();
          }
        );
      }
    });
  }

  // Hàm lấy nameWallet từ WalletService
  getNameWallet(id: any): any {
    return new Observable<string>(observer => {
      this.walletService.getWallet(id).subscribe(
        (res: any) => {
          observer.next(res.nameWallet || 'Không xác định');
          observer.complete();
        },
        (error: any) => {
          observer.error(error);
        }
      );
    });
  }

  // Cập nhật dữ liệu phân trang
  updatePagination() {
    this.showMenu = new Array(this.data.length).fill(false);
    this.isActive = new Array(this.data.length).fill(false);
    this.isEditing = new Array(this.data.length).fill(false);

    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.data.slice(startIndex, endIndex);
    console.log(this.paginatedData)
  }

  // Chuyển sang trang trước
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // Chuyển sang trang tiếp theo
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
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
    this.isEditing[index] = true;
    this.tempItem = { ...this.data[index] };
    this.showMenu[index] = false;
    this.isActive[index] = false;
  }

  saveItem(index: number) {
    this.isEditing[index] = false;
    this.tempItem = null;
    this.transactionService.editItem(this.paginatedData[index-1]).subscribe(
      (response:any) =>{
        console.log(response)
        if(response.status === 'success') location.reload();       
      },
      (error) =>
        console.log(error)
    )
  }

  cancelEdit(index: number) {
    this.data[index] = { ...this.tempItem };
    this.isEditing[index] = false;
    this.tempItem = null;
  }

  deleteItem(index: number) {
    if (confirm('Bạn có chắc chắn muốn xóa giao dịch này không?')) {
      const actualIndex = (this.currentPage - 1) * this.itemsPerPage + index;
      this.data.splice(actualIndex, 1);
      // Cập nhật lại ID cho các giao dịch sau khi xóa
      this.data.forEach((item, i) => (item.id = i + 1));
      this.updatePagination();
      this.transactionService.deleteItem(this.paginatedData[index-1]).subscribe(
        (res:any)=>{
          console.log(res)
        },
        (error) =>{
          console.log(error)
        }
      )
    }
  }
}