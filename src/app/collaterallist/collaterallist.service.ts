import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CollateralListService {
  constructor(private http: HttpClient) { }
  public getCollaterals(reqObj) {
      return this.http.post('getCollaterals', reqObj);
      // return this.http.get('/assets/mockdata/getCollaterals.json');
  }

  async collateralTypeCount(): Promise<any> {
    try {
      let res = await this.http.get('collateralTypeCount').toPromise();
      return res;
    } catch (error) {
      // await this.handleError(error);
      console.log("error", error);
    }
  }
  // collateralTypeCount() {
  //   return this.http.get('collateralTypeCount');
  //   // return this.http.get('/assets/mockdata/collateralTypeCount.json');
  // }
  public deleteCollateral(collateralId: any){
    return this.http.delete('deleteCollateral', {params:{"collateralId":collateralId}});
  }
}
