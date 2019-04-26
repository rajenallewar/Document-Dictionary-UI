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
  barChartData: any = {
    "dataInProgrss": [],
    "dataTotal": [],
    "dataWon": [],
    "dataLost": [],
    "labels": []
  };
  proposalCardsData :any;

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
// To pass data to bar chart (currently hard coded)

getSummaryOfProposalByAccount(){
  //  this.proposalservice.getSummaryofProposalsByAccount().subscribe((data)=>{
    //  data.forEach((proposal)=>{
    //    this.barChartData.dataInProgrss.push(proposal["countInprogress"])
    //    this.barChartData.dataTotal.push(proposal["countTotal"])
    //    this.barChartData.dataWon.push(proposal["countWon"])
    //    this.barChartData.dataLost.push(proposal["countLost"])
    //    this.barChartData.labels.push(proposal["clientName"])
    //  })        
  // })

  ['Wells Fargo','Citi','Asurian','Markit Group','HSBC'].forEach((companyName) => {
      this.barChartData.dataInProgrss.push(2,1,1,2,1)
      this.barChartData.dataTotal.push(5,4,3,5,3)
      this.barChartData.dataWon.push(4,2,2,1,2)
      this.barChartData.dataLost.push(0,1,2,2,1)
      this.barChartData.labels.push(companyName)
    })
}
}