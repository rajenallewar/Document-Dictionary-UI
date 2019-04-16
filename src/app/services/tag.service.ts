import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appURL } from '../config/config';
import { Injectable } from '@angular/core';
import { Tags } from '../models/tag';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TagServices {
  constructor(private _http: HttpClient) { }
  public getMostTrendingTags(){
    return this._http.get<Tags[]>(appURL + '/mostTrendingsTags');
  }
  public searchByTags(tag:string){
    return this._http.get<Tags[]>(appURL + '/searchByTags/'+tag);
  }
  public getAllTags(id:number){
    return this._http.get<Tags[]>(appURL + '/getAllTagsByCollateralId/'+id);
  }
  }
