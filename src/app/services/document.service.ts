import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DocumentModel } from '../models/documentViewer';
import { appURL } from '../config/config';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DocumentServices {
  constructor(private _http: HttpClient) { }

  public getDocuments() {
    return this._http.get<DocumentModel[]>(appURL + '/docData');
  }

  public searchKeyWord(keyWord: string[]) {
    return this._http.post(appURL + '/searchKeyword', keyWord);

  }

  public saveDocument(docModel: any) {
     return this._http.post(appURL + '/addDoc', docModel);
  }

}
