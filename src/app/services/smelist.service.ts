import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appURL } from '../config/config';
import { SMEList } from '../models/smelist';

@Injectable()
export class SMEListServices {
  constructor(private _http: HttpClient) { }
  public getSMEList(){
    return this._http.get<SMEList[]>(appURL + '/getListOfSmeData');
  }
  public getDomainByUserkeyword(domain:string){
    return this._http.get<SMEList[]>(appURL + '/getDomainByUserKeyword/'+domain);
  }
  
  }
