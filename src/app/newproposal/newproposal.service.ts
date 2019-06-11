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
  public getAllClients() {
    return this.http.get('getAllClients');
  }
  public getAllStatuses() {
    return this.http.get('getAllStatuses');
  }
  public saveProposal(proposal: any) {
    return this.http.post('saveProposal', proposal);
  }
  public buildSaveRequest(openType: any, proposal: any) {
    let request: any = {}
    if (openType == 'edit') {
      request["proposalId"] = proposal.proposalId;
    }
    if(typeof proposal.client == 'string') {
      request["client"] = {
        "clientName":proposal.client,
      };
    } else {
      request["client"] = {
        "clientId":proposal.client.clientId,
        "clientName":proposal.client.clientName,
      };
    }
  //  if(typeof proposal.client == 'string') {
  //     request["clientName"] = proposal.client;
  //   } else {
  //     request["clientId"] = proposal.client.clientId;
  //     request["clientName"] = proposal.client.clientName;
  //   }
    request["status"] = proposal.status;
    request["proposalName"] = proposal.proposalName;
    
    request["startDate"] = this.datePipe.transform(proposal.startDate, 'yyyy-MM-dd');
    request["endDate"] = this.datePipe.transform(proposal.endDate, 'yyyy-MM-dd');
    request["requirement"] = proposal.requirement;
    request["region"] = proposal.region;
    

    return request;
  }

}
