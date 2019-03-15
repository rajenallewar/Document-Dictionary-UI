import { DataShareService } from './../shared/data-share.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentServices } from '../services/document.services';
import { DocumentModel } from '../models/documentViewer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  fileList;
  filetype: Array<string>;
  uploadBox: boolean;



  globalSearch: string;
  docModel = new DocumentModel();
  docModels: any[];
  statusMessage: string;




  constructor(private route: Router,
    private dataShareService: DataShareService, private docServicses: DocumentServices) {

  }

  ngOnInit() {



    console.log(' End Of Files in Init');

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

  onGobalFilterChange(keyEvent) {

    if (keyEvent.which === 13) {
      this.SearchKeyword(this.globalSearch);
    }
    if (this.globalSearch === '') {
      this.getAllDocuments();
    }


  }


  SearchKeyword(keyWord: string) {
    let keys: string[] = keyWord.split(",");
    this.docServicses.searchKeyWord(keys).subscribe((responce: any[]) => {
      console.log(responce);
      this.docModels = responce;
    }, (error) => {
      console.log(error);
      this.statusMessage = "Problem with service. Please try again later!";
    });


  }







  displayFile(url) {
    this.dataShareService.setfileUrl(url);
    var filename = url.split('\\').pop();
    this.route.navigateByUrl(`view/${filename}`);

  }

}
