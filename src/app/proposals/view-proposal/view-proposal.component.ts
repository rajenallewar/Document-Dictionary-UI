import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalServices } from 'src/app/services/proposal.service';
import { CollateralServices } from 'src/app/services/collateral.service';

@Component({
    selector: 'app-view-proposal',
    templateUrl: './view-proposal.component.html',
    styleUrls: ['./view-proposal.component.scss']
})
export class ViewProposalComponent implements OnInit {
    @Input('data') proposals: string[] = [];
    Proposals:any;
    statusMessage: string;
    p: number = 1;
    total: number;
    loading: boolean;
    tableData: any;
    constructor(private route: Router,
        private proposalService:ProposalServices,private collateralService:CollateralServices) {

    }
     ngOnInit() {
        this.loadProposalData();
      
      }

      loadProposalData() {
        let proposalType = localStorage.getItem('proposalType');
        console.log("proposal type ", proposalType)
        let pageJSON={
            pageNumber:1,
            pageSize:10
        }
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
      getPage(page: number) {
          this.p = page;
        this.loading = true;
        let pageJSON={
            pageNumber:1,
            pageSize:10
        }
       
        this.proposalService.getAllProposals().subscribe(data => {
            console.log("data in getpage() ", data);
            this.tableData = data;
            
        })

        console.log("this.tableData ", this.tableData)
    }
      // To fetch all Proposal data 
     getAllProposals(){
        this.proposalService.getAllProposals().subscribe((data) => {
         this.Proposals = data;
      
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

