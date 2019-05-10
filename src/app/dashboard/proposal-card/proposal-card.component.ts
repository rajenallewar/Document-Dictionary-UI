import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalServices } from 'src/app/services/proposal.service';

@Component({
  selector: 'app-proposal-card',
  templateUrl: './proposal-card.component.html',
  styleUrls: ['./proposal-card.component.scss']
})
export class ProposalCardComponent implements OnInit {
@Input() proposalCardsData:any = [];
@Input() proposalCardsTotalCountData:any=[];
Proposals:any;
totalProposalCount: number = 0;
proposalCardsDetails: any = {};

constructor(private router: Router,private proposals:ProposalServices) { }
  ngOnInit() {
    console.log("onint in proposal card");
     this.getSummaryOfProposal();
  } 
  ngOnChanges() {
    console.log("input data is changed in proposal card");
    this.getSummaryOfProposal();
  }

   getSummaryOfProposal(){
     this.setCardDefaultValues();
     this.proposalCardsData.forEach((proposal) => {
        if(proposal.status.toUpperCase() === "WON") {
          this.proposalCardsDetails.wonProposalCount = proposal["countOfProposals"];
        } else if(proposal.status.toUpperCase() === "IN-PROGRESS") {
          this.proposalCardsDetails.inProgressProposalCount = proposal["countOfProposals"];
        } else if(proposal.status.toUpperCase() === "LOST") {
          this.proposalCardsDetails.lostProposalCount = proposal["countOfProposals"];
        }
        
      });
  
  }
   proposalCardClick(type:string){
     localStorage.setItem('proposalType',type);
     this.router.navigateByUrl('viewproposal');
  }
  setCardDefaultValues() {
    this.proposalCardsDetails = {
      "wonProposalCount": 0,
      "inProgressProposalCount": 0,
      "lostProposalCount": 0
    }
  }
}
