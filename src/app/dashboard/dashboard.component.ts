import { Component, OnInit } from '@angular/core';
import { ProposalServices } from '../services/proposal.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Proposals:any;
  doughtnutData: any = {
    "data": [],
    "label": []
  };
  barChartData: any = {};
  proposalCardsData :any;
  totalProposals: number = 0;

  constructor(private proposalservice:ProposalServices) {
 }

ngOnInit() {
this.getSummaryOfProposal();
this.getSummaryOfProposalByAccount();
}
// To pass data to  doughtnut chart 
getSummaryOfProposal(){
  this.proposalservice.getSummaryofProposalsByStatus().subscribe((data) => {      
    data.forEach((proposal) => {
      this.doughtnutData.data.push(proposal["countOfProposals"])
      this.doughtnutData.label.push(proposal["status"])
    });
 })
}
// To pass data to bar chart

getSummaryOfProposalByAccount(){
  //  this.proposalservice.getSummaryofProposalsByAccount().subscribe((data)=>{
    this.barChartData["dataInProgrss"] = [];
    this.barChartData["dataTotal"] = [];
    this.barChartData["dataWon"] = [];
    this.barChartData["dataLost"] = [];
    this.barChartData["labels"] = [];
    //  data.forEach((proposal)=>{
    //    this.barChartData.dataInProgrss.push(proposal["countInprogress"])
    //    this.barChartData.dataTotal.push(proposal["countOfProposals"])
    //    this.barChartData.dataWon.push(proposal["countWon"])
    //    this.barChartData.dataLost.push(proposal["countLost"])
    //    this.barChartData.labels.push(proposal["clientName"])
    //  })  
    ['Wells Fargo','Citi','Markit Group','Asurian','HSBC'].forEach((clientName)=>{
      this.barChartData.dataInProgrss.push(2,2,1,2,1)
      this.barChartData.dataTotal.push(5,4,4,6,4)
      this.barChartData.dataWon.push(1,1,1,2,2)
      this.barChartData.dataLost.push(2,1,2,2,1)
      this.barChartData.labels.push(clientName)
    })  
    //  this.totalProposals = data.length;
    
           
  // })

 }
 }