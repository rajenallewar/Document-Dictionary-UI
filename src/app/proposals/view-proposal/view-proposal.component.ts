import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DocumentModel } from 'src/app/models/documentViewer';
import { DocumentServices } from 'src/app/services/document.service';
import { DataShareService } from 'src/app/shared/data-share.service';
import { ProposalServices } from 'src/app/services/proposal.service';



@Component({
    selector: 'app-view-proposal',
    templateUrl: './view-proposal.component.html',
    styleUrls: ['./view-proposal.component.scss']
})
export class ViewProposalComponent implements OnInit {
    Proposals:any;
    statusMessage: string;
    constructor(private route: Router,
        private proposals:ProposalServices) {

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
     getAllProposals(){
        this.proposals.getAllProposals().subscribe((data) => {
        this.Proposals = data;
        console.log(data);
          })
    }
    getCompletedProposals(){
        this.proposals.getCompletedProposals().subscribe((data) => {
            this.Proposals = data;
            console.log(data);
              })
    }
    getInProgressProposals(){
        this.proposals.getInProgressProposals().subscribe((data) => {
            this.Proposals = data;
            console.log(data);
              })
    }
    getLostProposals(){
        this.proposals.getLostProposals().subscribe((data) => {
            this.Proposals = data;
            console.log(data);
              })
    }

    // displayFile(url) {
    //     this.dataShareService.setfileUrl(url);
    //     var filename = url.split('\\').pop();
    //     this.route.navigateByUrl(`view/${filename}`);

    // }
}

