import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerText:string = '';
  constructor(private router:Router, private acr:ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        switch (this.router.url) {
          case '/dms/dashboard':
            this.headerText = "Dashboard";
            break;
          case '/dms/proposals':
            this.headerText = "Proposal Listings";
            break;
          case '/dms/collaterals':
            this.headerText = "Collateral Listings";
            break;
            case '/dms/sme':
            this.headerText = "SMEs/Architects Listings";
            break;
        
          default:
            break;
        }
      }
    });
  }

  onNewCollateral() {
    this.router.navigate([{outlets:{dialogs:'uploadcollateral'}}], {relativeTo:this.acr});
  }
  onNewProposal() {
    this.router.navigate([{outlets:{dialogs:'newproposal'}}], {relativeTo:this.acr});
  }

}
