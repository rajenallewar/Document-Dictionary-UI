import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppSharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthChildGuard implements CanActivateChild {
  constructor(private router:Router, private appSharedService:AppSharedService) { }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let f = false;
    if (f) {
      return true;
    } else {
      this.appSharedService.setUserLoggedIn(false);
      this.router.navigate(['/login']);
      return false;
    }
    
  }
  
}
