import { Component, Input } from '@angular/core';
import { ProposalServices } from 'src/app/services/proposal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss']
})
export class ChartBarComponent  {
  data : any;
  options : any;
  barData;
  @Input() barChartData: any;
  constructor(private router: Router, private proposals:ProposalServices) { 
  }
  ngOnInit() {
     this.generateChartData();
  }
// To get bar chart data
  generateChartData(){
    this.barData = {
      labels: this.barChartData.labels,

      datasets: [
         {
              label: 'Total',
              backgroundColor: '#74f5ab',
              borderColor: '#74f5ab',
              data: this.barChartData.dataTotal
          },
          {
              label: 'Won',
              backgroundColor: '#3023ae',
              borderColor: '#3023ae',
              data: this.barChartData.dataWon
          },
          {
            label: 'In Progress',
            backgroundColor: '#ff69a4',
            borderColor: '#ff69a4',
            data: this.barChartData.dataInProgrss
        },
        {
          label: 'Lost',
          backgroundColor: '#7254f2',
          borderColor: '#7254f2',
          data: this.barChartData.dataLost
      }
      ]
  }
  this.options = {

    legend:{
      position: 'bottom',
      labels: {
        boxWidth: 12
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
  }

  }
    
 

