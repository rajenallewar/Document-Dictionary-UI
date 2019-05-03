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
      this.generateDoughtnutData();
        })
        this.generateDoughtnutData();
   }
  //  To get doughtnut chart data
    generateDoughtnutData(){
       this.doughnutChartData = {
        labels: ["New", "In-Progress", "Review", "Won", "Lost"],// this.doughtnutData.label,
          datasets: [
            {
              data: [300, 50, 100, 35, 90],//this.doughtnutData.data,
              backgroundColor: [
                "#FFC733",
                 "#ff2924",
                 "#33FF8D",
                 "#F028E9",
                 "#284FF0",   
              ],
              hoverBackgroundColor: [
                "#FFC733",
                "#ff2924",
                "#33FF8D",
                "#F028E9",
                "#284FF0",  
              ]
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
  

 
