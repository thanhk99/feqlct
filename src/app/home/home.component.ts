import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { TransactionService } from '../service/transaction.service';
import { WalletService } from '../service/wallet.service';

// Định nghĩa interface cho chartOptions
interface ChartDataPoint {
  y: number;
  label: string;
  color?: string;
}

interface ChartData {
  type: string;
  dataPoints: ChartDataPoint[];
}

interface ChartOptions {
  data: ChartData[];
  width: number;
  height: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private route: Router,
    private userService: UserService,
    private transactionService: TransactionService,
    private walletService: WalletService,
  ) {}

  transactions = [{ type: '', wallet: '', amount: 0, date: '' }];
  dataByDate: any[] = [];
  typeDate: string = "Chi phí";
  amount: number = 0;
  type: string = '';
  selectedValue: string = '';
  selectWallet: number = 0;
  selectedDate: string = '';
  selectDestWallet: number = 0;
  wallets = [{ id: 0, nameWallet: '' }];
  incomeOptions: string[] = ['Lương', 'Thưởng', 'Đầu tư', 'Khác'];
  expenseOptions: string[] = ['Ăn uống', 'Mua sắm', 'Hóa đơn', 'Khác'];
  dataByMonth: any[] = []; 
  dataByAccount: any[] = [];
  @Output() close = new EventEmitter<void>();
  isModalOpen = false;
  filterType: string = 'day'
  chartOptions: ChartOptions = {
    data: [{
      type: "column",
      dataPoints: []
    }],
    width: 400,
    height: 200
  };
  ngOnInit(): void {
    this.loadData()
    this.userService.getWallet().subscribe(
      (data: any) => {
        this.wallets = data;
      }
    );

    this.transactionService.getHisTrans(this.userService.getCookieID()).subscribe(
      (data: any) => {
        this.transactions = data.slice(0, 5);
      },
      (error: any) => {
        console.error(error);
      }
    );

    this.transactionService.getTotalByDate(this.typeDate).subscribe(
      (data: any) => {
        this.dataByDate = data;
        this.updateChart();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  onFilterChange(): void {
    this.updateChart();
  } 
  private MonthFormat(month: string): string {
    const [year, monthNum] = month.split('-');
    return `${year}-${parseInt(monthNum).toString().padStart(2, '0')}`; // 2025-3 -> 2025-03
  }
  updateChart(): void {
    let dataPoints: ChartDataPoint[] = [];
    if (this.filterType === 'day') {
      // Thống kê theo ngày (logic hiện tại)
      const today = new Date();
      const days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date.toISOString().split('T')[0]; // Định dạng YYYY-MM-DD
      }).reverse();

      dataPoints = days.map(day => {
        const entry = this.dataByDate.find((item: any) => item.date === day);
        return {
          y: entry ? entry.total : 0,
          label: day,
          color: 'rgb(236, 17, 28)'
        };
      });
    } else if (this.filterType === 'month') {
      const months = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        return `${date.getFullYear()}-${date.getMonth() + 1}`;
      }).reverse();

      dataPoints = months.map(month => {
        const normalizedMonth = this.MonthFormat(month);
        const entry = this.dataByMonth.find((item: any) => item.month === normalizedMonth);
        return {
          y: entry ? entry.total : 0,
          label: normalizedMonth,
          color: 'rgb(236, 17, 28)'
        };
      });
      console.log('Month dataPoints:', dataPoints);
    } else if (this.filterType === 'account') {
      // Thống kê theo tài khoản
      dataPoints = this.dataByAccount.map(account => ({
        y: account.total || 0,
        label: account.accountName || 'Unknown',
        color: 'rgb(236, 17, 28)'
      }));
    }

    // Cập nhật chartOptions
    this.chartOptions.data[0].dataPoints = dataPoints;
    this.chartOptions = { ...this.chartOptions };
    dataPoints=[]
  }
  private loadData(): void {
    this.transactionService.getTotalByMonth("Chi phí").subscribe(
      (data:any)=>{
        console.log(data)
        this.dataByMonth=data
      }
    )
    this.transactionService.getTotalByWallet("Chi phí").subscribe(
      (data:any)=>{
        this.dataByAccount=data
      }
    )
  }

  pageTransaction() {
    this.route.navigate(['/transaction']);
  }

  openModal(type: string) {
    this.type = type;
    this.isModalOpen = true;
  }

  closeModal() {
    this.close.emit();
    this.isModalOpen = false;
  }

  getOptionsForType(): string[] {
    if (this.type === 'Thu nhập') {
      return this.incomeOptions;
    }
    return this.expenseOptions;
  }

  confirm() {
    if (this.type === "Chuyển tiền") {
      this.transactionService.addTrans(this.selectWallet, this.type, this.amount, this.selectDestWallet, this.selectedDate).subscribe();
      this.walletService.updateBalance(this.selectWallet, this.amount * -1).subscribe();
      this.walletService.updateBalance(this.selectDestWallet, this.amount).subscribe();
      this.closeModal();
    } else if (this.type === "Chi phí") {
      this.transactionService.addTrans(this.selectWallet, this.type, this.amount, this.selectedValue, this.selectedDate).subscribe();
      this.walletService.updateBalance(this.selectWallet, this.amount * -1).subscribe();
      this.closeModal();
    } else {
      this.transactionService.addTrans(this.selectWallet, this.type, this.amount, this.selectedValue, this.selectedDate).subscribe();
      this.walletService.updateBalance(this.selectWallet, this.amount).subscribe();
      this.closeModal();
    }
    location.reload()
  }
}