import { Component, OnInit } from '@angular/core';
import { ProposalServices } from 'src/app/services/proposal.service';

@Component({
  selector: 'app-proposal-value-table',
  templateUrl: './proposal-value-table.component.html',
  styleUrls: ['./proposal-value-table.component.scss']
})
export class ProposalValueTableComponent implements OnInit {
  ProposalsValue: any;
  ProposalValuejson: any;
  constructor(private proposals:ProposalServices) { }

  ngOnInit() {
   this.getProposalValue();    
  }
  getProposalValue(){
    this.proposals.getSummaryofProposalsByStatus().subscribe((data) => {
    this. ProposalsValue = data;
   
     })
  
  }
}
