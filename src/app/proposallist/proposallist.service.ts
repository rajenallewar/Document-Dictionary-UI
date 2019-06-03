import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProposalListService {
  constructor(private http: HttpClient) { }
  public getCollaterals(reqObj) {
    // return this.http.post('getCollaterals', reqObj);
    return this.http.get('/assets/mockdata/getCollaterals.json');
  }
  public countOfProposalStatus() {
    // return this.http.get('countOfProposalStatus');
    return this.http.get('/assets/mockdata/countOfProposalStatus.json');
  }
}
