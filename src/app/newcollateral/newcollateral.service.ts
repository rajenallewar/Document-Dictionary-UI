import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewCollateralService {
    constructor(private http:HttpClient) {}
    public saveCollateral(collateral:any) {
      return this.http.post('saveCollateral', collateral);
    }
    public getAllCollateralTypes() {
      return this.http.get('allCollateralTypes');
      // return this.http.get('/assets/mockdata/allCollateralTypes.json');
    }
    public buildSaveRequest(collateral:any, openType, file) {
      let request: any = {}
      if(typeof collateral.collateralTypeUIModel == 'string') {
        request["collateralTypeUIModel"] = {
          "collateralType":collateral.collateralTypeUIModel,
        };
      } else {
        request["collateralTypeUIModel"] = {
          "collateralTypeId":collateral.collateralTypeUIModel.collateralTypeId,
          "collateralType":collateral.collateralTypeUIModel.collateralType,
        };
      }

      if (openType == 'edit') {
        request["collateralId"] = collateral.collateralId;
      }
      
      request["docName"] = collateral.docName;
      request["fileName"] = "Wells.pdf";

      if (file && file[0]) {
        request["file"] = {
          "name":file[0].name,
          "file":file[0]
        }
      }
      return request;
    }
    public deleteCollateral(collateral:any){
      return this.http.delete('deleteCollateral', collateral);
    }
}
