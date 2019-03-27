import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DocumentModel } from 'src/app/models/documentViewer';
import { DocumentServices } from 'src/app/services/document.services';
import { DataShareService } from 'src/app/shared/data-share.service';



@Component({
    selector: 'app-view-proposal',
    templateUrl: './view-proposal.component.html',
    styleUrls: ['./view-proposal.component.scss']
})
export class ViewProposalComponent implements OnInit {


    fileList;
    filetype: Array<string>;
    uploadBox: boolean;
    docModel = new DocumentModel();
    docModels: any[];
    statusMessage: string;
    constructor(private route: Router,
        private dataShareService: DataShareService, private docServicses: DocumentServices) {

    }

    ngOnInit() {

        this.getAllDocuments();

        this.uploadBox = false;
        this.filetype = ['Case Studies', 'Proposals', 'Technical documents', 'Domain'];
        this.fileList = [{
            "clientName": "Wells",
            "name": "Tech Doc",
            "startDate": "12 Feb 2018",
            "endDate": "03 May 2019",
            "Requirement": "NA",
            "RegionBU": "NA",
            "Status": "NA",
            "relatedDoc": [{
                "type": "Case Study",
                "url": "./assets/docs/sample.pdf"
            },
            {
                "type": "Domain",
                "url": "./assets/docs/sample.pdf"
            }
            ]
        },
        {
            "clientName": "Assurian",
            "name": "Architecture",
            "startDate": "11 Mar 2018",
            "endDate": "04 Nov 2018",
            "Requirement": "NA",
            "RegionBU": "NA",
            "Status": "NA",
            "relatedDoc": [{
                "type": "Case Study",
                "url": "./assets/docs/sample.pdf"
            },
            {
                "type": "Domain",
                "url": "./assets/docs/sample.pdf"
            }
            ]
        },
        {
            "clientName": "JP Morgan",
            "name": "SOW",
            "startDate": "18 Jul 2017",
            "endDate": "25 May 2018",
            "Requirement": "NA",
            "RegionBU": "NA",
            "Status": "NA",
            "relatedDoc": [{
                "type": "Case Study",
                "url": "./assets/docs/sample.pdf"
            },
            {
                "type": "Domain",
                "url": "./assets/docs/sample.pdf"
            }
            ]
        }, {
            "clientName": "Citi Bank",
            "name": "Design",
            "startDate": "26 Jan 2018",
            "endDate": "03 Apr 2019",
            "Requirement": "NA",
            "RegionBU": "NA",
            "Status": "NA",
            "relatedDoc": [{
                "type": "Case Study",
                "url": "./assets/docs/project.txt"
            },
            {
                "type": "Domain",
                "url": "./assets/docs/project.txt"
            }
            ]
        }

        ];
    }

    getAllDocuments() {
        this.docServicses.getDocuments().subscribe((docData) => {
            this.docModels = docData
        }, (error) => {
            console.log(error);
            this.statusMessage = 'Problem with service. Please try again later!';
        });
    }

    displayFile(url) {
        this.dataShareService.setfileUrl(url);
        var filename = url.split('\\').pop();
        this.route.navigateByUrl(`view/${filename}`);

    }
}

