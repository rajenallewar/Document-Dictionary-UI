import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-doughnut',
  templateUrl: './chart-doughnut.component.html',
  styleUrls: ['./chart-doughnut.component.scss']
})
export class ChartDoughnutComponent implements OnInit {
  data: any;
  options: any;
  constructor() {
    this.data = {
        labels: ['Won', 'Lost', 'In-Progress','Review','New'],
       
        datasets: [
          {
            data: [30, 50, 100,45,30],
            backgroundColor: [
             
              "#12a73a",
              "#ff2924",
               "#ffb902",
               "#016bc6",
               "#c6db03",
               
              
            ],
            hoverBackgroundColor: [
              
              "#12a73a",
              "#ff2924",
              "#ffb902",
              "#016bc6",
              "#c6db03",
              
            ]
          }]
      };

      this.options = {
        legend:{
            position: 'bottom'
          },
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
   ngOnInit() {
  
  }


}