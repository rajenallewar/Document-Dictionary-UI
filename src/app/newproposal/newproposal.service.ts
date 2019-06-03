import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewProposalService {
    constructor(private http:HttpClient) {}
    public getRegionData() {
      return this.http.get('getRegionData');
    }
    public saveProposal(proposal:any) {
      return this.http.post('saveProposal', proposal);
    }
     public buildSaveRequest(proposal:any, openType) {
      let request: any = {}
      if (openType == 'edit') {
        request["proposalId"] = proposal.proposalId;
      }
      request["proposalName"] = proposal.proposalName;
      request["clientName"] = proposal.clientName;
      request["startDate"] = proposal.proposalName;
      request["endDate"] = proposal.proposalName;
      request["requirement"] = proposal.proposalName;
      request["region"] = proposal.proposalName;
     }
  
}
