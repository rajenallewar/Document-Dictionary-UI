import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable()
export class NewProposalService {
  constructor(
    private http: HttpClient,
    public datePipe: DatePipe, ) { }
  public getRegionData() {
    return this.http.get('getAllRegions');
  }
  public saveProposal(proposal: any) {
    return this.http.post('saveProposal', proposal);
  }
  public buildSaveRequest(openType: any, proposal: any) {
    let request: any = {}
    if (openType == 'edit') {
      request["proposalId"] = proposal.proposalId;
      request["status"] = proposal.status;
    } else {
      request["status"] = 'New';
    }
    request["proposalName"] = proposal.proposalName;
    request["clientName"] = proposal.clientName;
    request["startDate"] = this.datePipe.transform(proposal.startDate, 'yyyy-MM-dd');
    request["endDate"] = this.datePipe.transform(proposal.endDate, 'yyyy-MM-dd');
    request["requirement"] = proposal.requirement;
    request["region"] = proposal.region;
    

    return request;
  }

}
