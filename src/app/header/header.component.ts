import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AppSharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerText:string = '';
  constructor(private router:Router,
    private acr:ActivatedRoute,
    public appSharedService:AppSharedService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        console.log(this.router.url);
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
          case '/dms/qa':
          this.headerText = "Q&A Forum";
          break;
        
          default:
            break;
        }
      }
    });
  }

  onNewCollateral() {
    this.appSharedService.setRouteData({
      "openType":"newFromHeader"
    });
    setTimeout(() => {
      this.router.navigate([{outlets:{dialogs:'uploadcollateral'}}], {relativeTo:this.acr});
    }, 0);
  }
  onNewProposal() {
    this.appSharedService.setRouteData({
      "openType":"newFromHeader"
    });
    setTimeout(() => {
      this.router.navigate([{outlets:{dialogs:'newproposal'}}], {relativeTo:this.acr});
    }, 0);
 
  }
  onDateSelect(event){
    this.appSharedService.setDashboardDateSubject(event);
  }


}
