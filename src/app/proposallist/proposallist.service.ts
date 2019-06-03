import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProposalListService {
  constructor(private http: HttpClient) { }
  public getProposalList(reqObj) {
    return this.http.post('getProposals', reqObj);
    // return this.http.get('/assets/mockdata/getProposals.json');
  }
  public countOfProposalStatus() {
    return this.http.get('countOfProposalStatus');
    // return this.http.get('/assets/mockdata/countOfProposalStatus.json');
  }
}
