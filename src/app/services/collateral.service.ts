import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appURL } from '../config/config';
import { Injectable } from '@angular/core';

import { Collateral } from '../models/collateral';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CollateralServices {
  constructor(private _http: HttpClient) { }

  public getCollaterals() {
    return this._http.get<Collateral[]>(appURL + '/getCollaterals');
  }
  public saveCollateral(Collateral:any) {
    return this._http.post(appURL + '/saveCollaterals',Collateral);
  }
  public getCollateralsByProposalId(id:number) {
    return this._http.get(appURL + '/getCollateralsByProposalId/'+id);
  }
  public readHtmlConvertedFile(ID:number){
  return this._http.get(appURL+'/pdfToHtml/'+ID, {responseType: 'text'});
  }
  public saveTagsAgainstCollateral(annotations:any) {
    return this._http.post(appURL + '/saveTags',annotations);
  }
  

  }

