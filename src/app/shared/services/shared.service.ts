import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSharedService {

  isUserLoggedIn: boolean = false;
  public _routeData:any;
  private newCollateralCloseSubject: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  setUserLoggedIn (flag) {
    this.isUserLoggedIn = flag;
  }

  getUserLoggedIn () {
    return this.isUserLoggedIn;
  }

  setRouteData(value:any) {
    this._routeData = value
  }

  getRouteData():any {
    return this._routeData;
  }

  clearRouteData():any {
    this._routeData = null;
  }

  getNewCollateralCloseEvent(){
    return this.newCollateralCloseSubject.asObservable();
  }

  setNewCollateralCloseEvent(flag){
    this.newCollateralCloseSubject.next(flag);
  }




}
