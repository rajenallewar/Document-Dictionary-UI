import { Component } from '@angular/core';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss']
})
export class ChartBarComponent  {
  data : any;
  options : any;
  constructor() { 
    this.data = {
      labels: ['April 1', 'April 3', 'April 6', 'April 9', 'April 13 ', 'April 17', 'April 23', 'April 30'],
      datasets: [
          {
              label: 'Total',
              backgroundColor: '#3023ae',
              borderColor: '#3023ae',
              data: [65, 59, 80, 81, 56, 55, 40,35]
          },
          {
              label: 'In-Progress',
              backgroundColor: '#ff69a4',
              borderColor: '#ff69a4',
              data: [28, 48, 40, 19, 86, 27, 90,52]
          }
      ]
  }
  this.options = {
    legend:{
      position: 'bottom',
     
    layout: {
      padding: {
          left: 15,
          right: 15,
          top: 15,
          bottom: 15
      }
    
    }
  }
}
  }

 
}
