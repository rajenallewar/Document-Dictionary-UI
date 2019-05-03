import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalServices } from 'src/app/services/proposal.service';

@Component({
  selector: 'app-proposal-card',
  templateUrl: './proposal-card.component.html',
  styleUrls: ['./proposal-card.component.scss']
})
export class ProposalCardComponent implements OnInit {
Proposals:any;
totalProposalCount: number = 0;
proposalCardsData: any = {
  "wonProposalCount": 0,
  "inProgressProposalCount": 0,
  "lostProposalCount": 0
};

constructor(private router: Router,private proposals:ProposalServices) { }
  ngOnInit() {
   this.getProposal();
   this.getSummaryOfProposal();
  } 

  getProposal(){
    let pageJSON={
      pageNumber:1,
      pageSize:10
  }
      this.proposals.getAllProposals(pageJSON).subscribe((data) => {
      this.Proposals = data;
      this.totalProposalCount = this.Proposals.length;
      })
   }
   getSummaryOfProposal(){
    this.proposals.getSummaryofProposalsByStatus().subscribe((data) => {      
      data.forEach((proposal) => {
        if(proposal.status.toUpperCase() === "WON") {
          this.proposalCardsData.wonProposalCount = proposal["countOfProposals"];
        } else if(proposal.status.toUpperCase() === "IN-PROGRESS") {
          this.proposalCardsData.inProgressProposalCount = proposal["countOfProposals"];
        } else if(proposal.status.toUpperCase() === "LOST") {
          this.proposalCardsData.lostProposalCount = proposal["countOfProposals"];
        }
      });
   })
  }
  
  proposalCardClick(type:string){
     localStorage.setItem('proposalType',type);
     this.router.navigateByUrl('viewproposal');
  }
}
