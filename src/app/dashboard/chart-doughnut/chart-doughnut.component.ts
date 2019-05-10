import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalServices } from 'src/app/services/proposal.service';

@Component({
  selector: 'app-chart-doughnut',
  templateUrl: './chart-doughnut.component.html',
  styleUrls: ['./chart-doughnut.component.scss']
})
export class ChartDoughnutComponent implements OnInit {
  data: any;
  options: any;
  doughnutChartData;
  Proposals:any;
  @Input() doughtnutData: any;
  constructor(private router: Router, private proposals:ProposalServices) { }

   ngOnInit() {
    //  this.getProposalSummary();
      this.generateDoughtnutData();     
   }

   ngOnChanges() {
     console.log("input data is changed in donut chart");
     this.generateDoughtnutData();
   }
  
  //  To get count of proposal by status (to show on doughtnut chart)
  //  getProposalSummary(){
  //   this.proposals.getSummaryofProposalsByStatus().subscribe((data) => {
  //     this.Proposals = data;
  //     this.generateDoughtnutData();
  //       })
  //       this.generateDoughtnutData();
  //  }
  //  To get doughtnut chart data
    generateDoughtnutData(){
      console.log("donutData ", this.doughtnutData);
      
       this.doughnutChartData = {
         labels: this.doughtnutData.label,
        // labels: ['In-Progress','Lost','New','Review','Won'],
          datasets: [
            {
              data:this.doughtnutData.data,
              backgroundColor:this.doughtnutData.bgColor,
              hoverBackgroundColor:this.doughtnutData.bgColor
            }]
        };
       this.options = {
          legend:{
              position: 'right',
              labels: {
                boxWidth: 5
            } 
            },
            cutoutPercentage: 70,
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
  

 
