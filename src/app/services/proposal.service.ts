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
    return this._http.get<Proposal[]>(appURL + '/getProposals' );
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
  public getCompletedProposals(startDate: string,endDate: string):Observable<any> {
    return this._http.get<Proposal[]>(appURL + `/statusOfCompletedProposals/${startDate}/${endDate}`);
  }
  public getInProgressProposals(startDate: string,endDate: string):Observable<any> {
    return this._http.get<Proposal[]>(appURL + `/statusOfInProgressProposals/${startDate}/${endDate}`);
  }
  public getLostProposals(startDate: string,endDate: string):Observable<any> {
    return this._http.get<Proposal[]>(appURL + `/statusOfLostProposals/${startDate}/${endDate}`);
  }
  public getSummaryofProposalsByStatus(requestParams: any){
    console.log("calling getSummaryofProposalsByStatus ", requestParams)
    return this._http.get<Proposal[]>(appURL + `/getSummaryOfProposalsByStatus/${requestParams.startDate}/${requestParams.endDate}`);
  }
  public getSummaryofProposalsByAccount(requestParams:any){
    return this._http.get<Proposal[]>(appURL + `/getproposalStatusCountByAccount/${requestParams.startDate}/${requestParams.endDate} `);
  }
  public getProposalCountByDate(requestParams:any){
    return this._http.get<Proposal[]>(appURL + `/getToltalProposalCount/${requestParams.startDate}/${requestParams.endDate} `);
  }
 
  }

