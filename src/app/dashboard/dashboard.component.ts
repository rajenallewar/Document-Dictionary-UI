
import { Component, OnInit } from '@angular/core';
import { ProposalServices } from '../services/proposal.service';
import { Proposal } from '../models/proposal';

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
  proposalCardsData :any;

  constructor(  private proposals:ProposalServices) {
 }

ngOnInit() {
this.getSummaryOfProposal();
}
getSummaryOfProposal(){
  this.proposals.getSummaryofProposalsByStatus().subscribe((data) => {      
    data.forEach((proposal) => {
      this.doughtnutData.data.push(proposal["countOfProposals"])
      this.doughtnutData.label.push(proposal["status"])
    });
 })
}
}