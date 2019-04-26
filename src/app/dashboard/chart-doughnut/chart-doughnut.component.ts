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
  constructor(private router: Router, private proposals:ProposalServices) {
    }

   ngOnInit() {
     this.getProposalSummary();
   }
  
  //  To get count of proposal by status (to show on doughtnut chart)
   getProposalSummary(){
    this.proposals.getSummaryofProposalsByStatus().subscribe((data) => {
      this.Proposals = data;
      console.log(data);
      this.generateDoughtnutData();
        })
   }
  //  To get doughtnut chart data
    generateDoughtnutData(){
       this.doughnutChartData = {
        labels: this.doughtnutData.label,
          datasets: [
            {
              data: this.doughtnutData.data,
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
              position: 'bottom',
              labels: {
                boxWidth: 12
            } 
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
  

 
