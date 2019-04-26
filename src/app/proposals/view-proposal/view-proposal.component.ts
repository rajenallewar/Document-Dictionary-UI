import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalServices } from 'src/app/services/proposal.service';
import { CollateralServices } from 'src/app/services/collateral.service';
@Component({
    selector: 'app-view-proposal',
    templateUrl: './view-proposal.component.html',
    styleUrls: ['./view-proposal.component.scss']
})
export class ViewProposalComponent implements OnInit {
    Proposals:any;
    statusMessage: string;
    constructor(private route: Router,
        private proposalService:ProposalServices,private collateralService:CollateralServices) {

    }
     ngOnInit() {
        let proposalType = localStorage.getItem('proposalType');
        console.log("proposal type ", proposalType)
        if (proposalType == 'ALL') {
            this.getAllProposals();
        } else if (proposalType == 'COMPLETED') {
            this. getCompletedProposals();
        } else if (proposalType == 'IN_PROGRESS') {
            this.getInProgressProposals();}
            else if (proposalType == 'REJECTED') {
                this. getLostProposals();} 
        else {
            this.getAllProposals();
        }
     localStorage.removeItem('proposalType');
      }
      // To fetch all Proposal data 
     getAllProposals(){
        this.proposalService.getAllProposals().subscribe((data) => {
        this.Proposals = data;
        console.log(data);
          })
    }
      // To fetch Proposal data by status (by clicking on dashboard cards) 
    getCompletedProposals(){
        this.proposalService.getCompletedProposals().subscribe((data) => {
            this.Proposals = data;
            console.log(data);
              })
    }
    getInProgressProposals(){
        this.proposalService.getInProgressProposals().subscribe((data) => {
            this.Proposals = data;
            console.log(data);
              })
    }
    getLostProposals(){
        this.proposalService.getLostProposals().subscribe((data) => {
            this.Proposals = data;
            console.log(data);
              })
    }
    // To fetch collateral linking with that proposal
    getCollateral(id:number){
        localStorage.setItem('proposalId', id.toString());
        this.route.navigateByUrl('viewcollateral');
    }

  
}

