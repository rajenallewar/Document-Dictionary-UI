import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProposalServices } from 'src/app/services/proposal.service';
import { CollateralServices } from 'src/app/services/collateral.service';
import { DataShareService } from 'src/app/shared/data-share.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-view-proposal',
    templateUrl: './view-proposal.component.html',
    styleUrls: ['./view-proposal.component.scss']
})
export class ViewProposalComponent implements OnInit {
    @Input('data') proposals: string[] = [];
    arrProposals:any;
    statusMessage: string;
    p: number = 1;
    total: number;
    loading: boolean;
    tableData: any;
    constructor(private route: Router,
        private proposalService:ProposalServices,private collateralService:CollateralServices,private dataShareService:DataShareService,public datePipe: DatePipe) {

    }
     ngOnInit() {
        this.loadProposalData();
      
      }

      loadProposalData() {
        let proposalType = localStorage.getItem('proposalType');
        console.log("proposal type ", proposalType)

        if (proposalType == 'ALL') {
            this.getAllProposals();
        } else if (proposalType == 'COMPLETED') {
            this.getCompletedProposals(this.dataShareService.startDate, this.dataShareService.endDate);
        } else if (proposalType == 'IN_PROGRESS') {
            this.getInProgressProposals(this.dataShareService.startDate, this.dataShareService.endDate);}
        else if (proposalType == 'REJECTED') {
            this. getLostProposals(this.dataShareService.startDate, this.dataShareService.endDate);} 
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
        // this.proposalService.getAllProposals().subscribe((data) => {
        //  this.arrProposals = data;
      
        //   })
    }
      // To fetch Proposal data by status (by clicking on dashboard cards) 
    getCompletedProposals(sDate: string,eDate: string){
       
        this.proposalService.getCompletedProposals(sDate, eDate).subscribe((data) => {
            this.arrProposals = data;
            console.log(data);
              })
    }
    getInProgressProposals(sDate: string,eDate: string){
        this.proposalService.getInProgressProposals(sDate,eDate).subscribe((data) => {
            this.arrProposals = data;
            console.log(data);
              })
    }
    getLostProposals(sDate: string,eDate: string){
        this.proposalService.getLostProposals(sDate,eDate).subscribe((data) => {
            this.arrProposals = data;
            console.log(data);
              })
    }
    // To fetch collateral linking with that proposal
    getCollateral(id:number){
        localStorage.setItem('proposalId', id.toString());
        this.route.navigateByUrl('viewcollateral');
    }

  
}

