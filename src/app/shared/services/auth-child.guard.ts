import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AppSharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthChildGuard implements CanActivateChild {
  constructor(private router:Router, private acRoute:ActivatedRoute, private appSharedService:AppSharedService) { }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.router.url);
    console.log(this.acRoute.url);
    console.log(state.url);
    if (state.url == '/') {
      this.appSharedService.setUserLoggedIn(false);
      this.router.navigate(['/login']);
      return false;
    } else {
      if (this.appSharedService.getUserLoggedIn()) {
        return true;
      } else {
        this.appSharedService.setUserLoggedIn(false);
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
  
}
