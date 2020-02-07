import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GNE } from './global-enagements.component';
import { Observable } from 'rxjs';
import { AppSettings } from '../../environments/environment';

@Injectable()
export class GlobalEngagementsService {
  constructor(private http: HttpClient) { }
  getGlobalEngagementsData(): Observable<any> {
    return this.http.get('globalEngagements');
    // return this.http.get('/assets/mockdata/datagne.json');
  }
  updateGlobalEngagementData(gneData: GNE): Observable<any> {
    return this.http.put('globalEngagements', gneData);
  }
  deleteGlobalEngagementData(id: string): Observable<any> {
    return this.http.delete(AppSettings.BASE_URL + '/globalengagements/engagements/' + id, { responseType: 'text'});
  }
}
