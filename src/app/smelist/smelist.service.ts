import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SmeService {
    constructor(private http:HttpClient) {}
    public getSmeList(){
        return this.http.get('getSmeList')
      }
     public getTotalSmeCount(){
        return this.http.get('getTotalSmeCount')
      }
}
