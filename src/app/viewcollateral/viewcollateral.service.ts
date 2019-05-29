import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ViewCollateralService {
    constructor(private http:HttpClient) {}
    
    public readHtmlConvertedFile(id) {
      return this.http.get('viewCollateral', {params: {collateralId: id}});
      
    //   return this.http.get('/assets/mockdata/allCollateralTypes.json');
    }
}
