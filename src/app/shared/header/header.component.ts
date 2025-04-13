// finance-chart.component.ts
import { Component, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'app-header',
  imports:[    CommonModule,
    CanvasJSAngularChartsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {
  constructor(
    private router: Router,
    private userService: UserService,
    private transactionService: TransactionService
  ){}
  trans=[]
  income:number=0
  expense:number=0
  total:number=0
  username:string='';
  isHidden :boolean=true;
  wallets : any[] =[];
  chartOptions = {
    animationEnabled: true,
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}",
      showInLegend: false,
      dataPoints: [
        { y: this.income, label: "Thu", color: "greenyellow" },
        { y: this.expense, label: "Chi", color: "rgb(236, 17, 28)" }
      ]
    }],
    width:100,
    height:100
  };
  ngOnInit(): void {
    this.username=this.userService.getCookiedName();
    this.userService.getWallet().subscribe(
      (data: any) => {
        this.wallets=data.slice(0, 2);
      },
      (error) => {
        console.error(error);
      }

    )
    this.transactionService.getHisTrans(this.userService.getCookieID()).subscribe(
      (data: any) => {
        data.forEach((element: any) => {
          if(element.type==="Chi phí"){
            this.expense+=element.amount
          }
          else if (element.type==="Thu nhập"){
            this.income+=element.amount
          }
        });
        this.total=this.income-this.expense
        this.updateChart()
      }
    )
  }
  updateChart(): void {
    this.chartOptions.data[0].dataPoints = [
      { y: this.income, label: "Thu", color: "greenyellow" },
      { y: this.expense, label: "Chi", color: "rgb(236, 17, 28)" }
    ];
    this.chartOptions = { ...this.chartOptions }; // Trigger change detection
  }
  openMenu(){
    this.isHidden = !this.isHidden;
  }
  getCurDate(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1 ;
    return `Tháng ${month}, ${year}`;
  }
  pageTransaction(){
    this.router.navigate(['/transaction'])
  }
  pageHome(){
    this.router.navigate(['/'])
  }
  pageWallet(){
    this.router.navigate(['/wallet'])
  }
}