import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSharedService {

  isUserLoggedIn: boolean = false;
  public _routeData:any;

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
}
