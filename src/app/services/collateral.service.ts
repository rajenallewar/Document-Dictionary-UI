import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appURL } from '../config/config';
import { Injectable } from '@angular/core';
import { Proposal } from '../models/proposal';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CollateralServices {
  constructor(private _http: HttpClient) { }

  public getCollaterals() {
    return this._http.get<Proposal[]>(appURL + '/getCollaterals');
  }
  public saveCollateral(Collateral:any) {
    return this._http.get<Proposal[]>(appURL + '/saveCollateral');
  }
 
  }

