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
      labels: ['Wells Fargo', 'Citi', 'HSBC', 'Assurian', 'Markit Group', 'DMT' ],
      datasets: [
          {
              label: 'Total',
              backgroundColor: '#4ac1ff',
              borderColor: '#4ac1ff',
              data: [65, 59, 80, 81, 86,60]
          },
          {
              label: 'Won',
              backgroundColor: '#3023ae',
              borderColor: '#3023ae',
              data: [38, 48, 40, 39, 56,40]
          },
          {
            label: 'In Progress',
            backgroundColor: '#ff69a4',
            borderColor: '#ff69a4',
            data: [21, 28, 30, 19, 36,20]
        },
        {
          label: 'Lost',
          backgroundColor: '#74f5ab',
          borderColor: '#74f5ab',
          data: [18, 18, 20, 14, 30,16]
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
