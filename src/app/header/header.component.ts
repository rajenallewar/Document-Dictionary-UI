import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerText:string = '';
  constructor(private router:Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        switch (this.router.url) {
          case '/dashboard':
            this.headerText = "Dashboard";
            break;
          case '/proposals':
            this.headerText = "Proposal Listings";
            break;
          case '/collaterals':
            this.headerText = "Collateral Listings";
            break;
        
          default:
            break;
        }
      }
    });
  }

}
