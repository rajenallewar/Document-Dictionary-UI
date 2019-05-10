import { Component, OnChanges, Input } from '@angular/core';
import { ProposalServices } from 'src/app/services/proposal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss']
})
export class ChartBarComponent implements OnChanges  {
  data : any;
  options : any;
  barData: any;
  @Input() barChartData: any;
  @Input() totalProposals: number;
  // @Input() labels: any;
  constructor(private router: Router, private proposals:ProposalServices) { 
  }
  ngOnInit() {
   
  }
  ngOnChanges() {
    console.log("ng on changes");
    console.log("totalProposals ", this.totalProposals)
   this.generateChartData();
  }
// To get bar chart data
  generateChartData(){
    this.barData = {
      labels: this.barChartData.labels,

      datasets: [
         {
              label: 'Total',
              backgroundColor: '#33B5FF',
              borderColor: '#33B5FF',
              data: this.barChartData.dataTotal
          },
          {
              label: 'Won',
              backgroundColor: '#2543ea',
              borderColor: '#2543ea',
              data: this.barChartData.dataWon
          },
          {
            label: 'In Progress',
            backgroundColor: '#FFC733',
            borderColor: '#FFC733',
            data: this.barChartData.dataInProgrss
        },
        {
          label: 'Lost',
          backgroundColor: '#FF3333',
          borderColor: '#FF3333',
          data: this.barChartData.dataLost
      }
      ]
  }

  console.log("this.barChartData.dataInProgrss ",this.barChartData.dataInProgrss);
  
  this.options = {

    legend:{
      position: 'bottom',
      labels: {
        boxWidth: 5
       
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
    
 

