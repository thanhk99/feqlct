// finance-chart.component.ts
import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports:[    CommonModule,
    CanvasJSAngularChartsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  constructor(
    private router: Router
  ){}
  isHidden :boolean=true;
  chartOptions = {
  data: [{
      type: "pie",
      dataPoints: [
          { label: "Chi", y: 70, color: "red" },  // Màu đỏ cho Thu
          { label: "Thu", y: 30, color: "green" } // Màu xanh lá cho Chi
      ]
    }],
    width: 100,
    height: 100,
  };
  openMenu(){
    this.isHidden = !this.isHidden;
  }
  pageTransaction(){
    this.router.navigate(['/transaction'])
  }
  pageHome(){
    this.router.navigate(['/'])
  }
}