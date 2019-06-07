import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CollateralListService {
  constructor(private http: HttpClient) { }
  public getCollaterals(reqObj) {
      return this.http.post('getCollaterals', reqObj);
      // return this.http.get('/assets/mockdata/getCollaterals.json');
  }

  async collateralTypeCount(reqObj): Promise<any> {
    try {
      let res = await this.http.post('collateralTypeCount',reqObj).toPromise();
      return res;
    } catch (error) {
      // await this.handleError(error);
      console.log("error", error);
    }
  }
  public deleteCollateral(collateralId: any){
    return this.http.delete('deleteCollateral', {params:{"collateralId":collateralId}});
  }
}
