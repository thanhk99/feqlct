import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [CommonModule,CanvasJSAngularChartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private route: Router
  ){}
  chartOptions = {
    data:[
      {
        type:"line",
        dataPoints: [
        { x: new Date(2023, 3, 12), y: 450 }, 
        { x: new Date(2023, 3, 13), y: 414 }, 
        { x: new Date(2023, 3, 14), y: 520 }, 
        { x: new Date(2023, 3, 15), y: 460 }, 
        { x: new Date(2023, 3, 16), y: 450 }, 
        { x: new Date(2023, 3, 17), y: 500 }, 
        { x: new Date(2023, 3, 18), y: 480 }
        ],

      }
    ],
    width:600,
    height:200  
  };
  pageTransaction(){
    this.route.navigate(['/transaction'])
  }
}
