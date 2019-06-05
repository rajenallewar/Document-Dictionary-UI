import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService {
    constructor(private http:HttpClient) {}
    public getTrendingTags() {
      return this.http.get('getTrendingTags');
    }
    public getSummaryofProposalsByAccount(requestParams:any): Observable<any> {
      return this.http.post('getSummaryofProposalsByAccount',requestParams);
    }
  
}