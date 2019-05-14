import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSharedService {

  isUserLoggedIn: boolean = false;
  constructor() { }

  setUserLoggedIn (flag) {
    this.isUserLoggedIn = flag;
  }

  getUserLoggedIn () {
    return this.isUserLoggedIn;
  }
}
