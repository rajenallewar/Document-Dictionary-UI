import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewCollateralService {
    constructor(private http:HttpClient) {}
    public saveCollateral(Collateral:any) {
        return this.http.post('saveCollateral',Collateral);
      }
}
