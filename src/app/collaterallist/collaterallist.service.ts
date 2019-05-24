import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CollateralListService {
    constructor(private http:HttpClient) {}
    public getCollaterals(reqObj){
        // return this.http.post('getCollaterals', reqObj);
        return this.http.get('getCollaterals');
      }
     public collateralTypeCount(){
        return this.http.get('collateralTypeCount')
      }
}
