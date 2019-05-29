import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewCollateralService {
    constructor(private http:HttpClient) {}
    public saveCollateral(collateral:any) {
      return this.http.post('saveCollateral', collateral);
    }
    public getAllCollateralTypes() {
      // return this.http.get('allCollateralTypes');
      return this.http.get('/assets/mockdata/allCollateralTypes.json');
    }
    public buildSaveRequest(collateral:any) {
      let request: any = {}
      if(typeof collateral.collateralType == 'string') {
        request.collateralType = {
          collateralType:collateral.collateralType,
        };
      } else {
        request.collateralType = {
          collateralTypeId:collateral.collateralType.collateralTypeId,
          collateralType:collateral.collateralType.collateralType,
        };
      }
      request.docName = collateral.documentName;
      // request.uploadedFiles = [];
      return request;
    }

}
