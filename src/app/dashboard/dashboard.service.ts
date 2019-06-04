import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService {
    constructor(private http:HttpClient) {}
    public getTrendingTags() {
      return this.http.get('getTrendingTags');
    }
    public getSummaryofProposalsByAccount(requestParams:any){
      return this.http.post('getSummaryofProposalsByAccount',requestParams);
    }
  
}