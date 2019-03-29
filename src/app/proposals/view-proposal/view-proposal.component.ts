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


    fileList;
    filetype: Array<string>;
    uploadBox: boolean;
    Proposals:any;
    // docModel = new DocumentModel();
    // docModels: any[];
    statusMessage: string;
    constructor(private route: Router,
        private proposals:ProposalServices) {

    }

    ngOnInit() {

        this.getAllProposals();

      
    }

 
        getAllProposals(){

        this.proposals.getAllProposals().subscribe((data) => {
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

