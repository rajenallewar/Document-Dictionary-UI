import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CollateralListService {
  constructor(private http: HttpClient) { }
  public getCollaterals(reqObj) {
      // return this.http.post('getCollaterals', reqObj);
      return this.http.get('/assets/mockdata/getCollaterals.json');
  }
  public collateralTypeCount() {
    return this.http.get('collateralTypeCount');
    // return this.http.get('/assets/mockdata/collateralTypeCount.json');
  }
  public deleteCollateral(collateralId: any){
    return this.http.delete('deleteCollateral', {params:{"collateralId":collateralId}});
  }
}
