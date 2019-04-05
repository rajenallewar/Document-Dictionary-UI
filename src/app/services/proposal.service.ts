import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appURL } from '../config/config';
import { Injectable } from '@angular/core';
import { Proposal } from '../models/proposal';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProposalServices {
  constructor(private _http: HttpClient) { }

  public getAllProposals():Observable<any> {
    return this._http.get<Proposal[]>(appURL + '/getProposals');
  }
  public saveProposals(Proposal:any) {
    return this._http.post(appURL + '/save',Proposal);
  }
  public getProposalsCost() {
    return this._http.get<Proposal[]>(appURL + '/getProposalsCost');
  }
  public getProposalsStatus() {
    return this._http.get<Proposal[]>(appURL + '/getProposalStatus');
  }
  public getCompletedProposals():Observable<any> {
    return this._http.get<Proposal[]>(appURL + '/statusOfCompletedProposals');
  }
  public getInProgressProposals():Observable<any> {
    return this._http.get<Proposal[]>(appURL + '/statusOfInProgressProposals');
  }
  public getLostProposals():Observable<any> {
    return this._http.get<Proposal[]>(appURL + '/statusOfLostProposals');
  }
  public getSummaryofProposalsByStatus(){
    return this._http.get<Proposal[]>(appURL + '/getSummaryOfProposalsByStatus');
  }
  }

