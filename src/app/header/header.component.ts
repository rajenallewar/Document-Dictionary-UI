import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AppSharedService } from '../shared/services/shared.service';
import { Entitlement } from '../shared/utils/entitlement';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  providers: [Entitlement],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  headerText = "Dashboard";
  showCalender = false;
  mtd = false;
  wtd = false;
  constructor(private router: Router,
    private acr: ActivatedRoute,
    public appSharedService: AppSharedService,
    public entitlement: Entitlement,
    public datePipe: DatePipe) { }

  ngOnInit() {
    this.showCalender = false;
    this.mtd = false;
    this.wtd = false;
    console.log(this.router.url);
    this.setHeader();
  }

  setHeader() {
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
      case '/dms/globalengagements':
        this.headerText = "Global Engagements";
        break;
      default:
        break;
    }
  }

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setHeader();
      }
    });

    setTimeout(() => {
      this.showCalender = true;
    }, 100);
  }


  onNewCollateral() {
    this.appSharedService.setRouteData({
      "openType": "newFromHeader"
    });
    setTimeout(() => {
      this.router.navigate([{ outlets: { dialogs: 'uploadcollateral' } }], { relativeTo: this.acr });
    }, 0);
  }
  onNewProposal() {
    this.appSharedService.setRouteData({
      "openType": "newFromHeader"
    });
    setTimeout(() => {
      this.router.navigate([{ outlets: { dialogs: 'newproposal' } }], { relativeTo: this.acr });
    }, 0);

  }
  onDateSelect(event, calendar) {
    console.log("Event", event);
    if (event.target && event.target.id === 'mtdate' && event.target.checked) {
      this.mtd = true;
      this.wtd = false;
      event = this.setDates();
    } else if (event.target && event.target.id === 'wtdate' && event.target.checked) {
      this.wtd = true;
      this.mtd = false;
      event = this.setDates();
    } else if (event.target) {
      this.mtd = this.wtd = false;
      this.resetDates();
    } else {
      this.mtd = this.wtd = false;
    }
    this.appSharedService.setDashboardDateSubject(event);
    if (this.appSharedService.dateRange && this.appSharedService.dateRange[0] && this.appSharedService.dateRange[1]) {
      if (calendar) {
        calendar.hideOverlay();
      }
    }
  }

  resetDates() {
    let currentDate = new Date();

    //Set end date as of yesterday
    currentDate.setDate(currentDate.getDate() - 1);
    this.appSharedService.endDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');

    //Set start date as 1 month before
    currentDate.setMonth(currentDate.getMonth() - 1);
    this.appSharedService.startDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    this.appSharedService.dateRange = [new Date(this.appSharedService.startDate), new Date(this.appSharedService.endDate)];
    console.log("this.dateRange ", this.appSharedService.dateRange);
  }

  setDates() {
    let currentDate = new Date();
    if (this.mtd) {
      currentDate.setDate(currentDate.getDate() - currentDate.getDate() + 1);
      this.appSharedService.startDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    } else if (this.wtd) {
      currentDate.setDate(currentDate.getDate() - currentDate.getDay());
      this.appSharedService.startDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    } else {
      currentDate.setDate(currentDate.getDate() - 30);
      this.appSharedService.startDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    }
    currentDate = new Date();
    //Set end date as of yesterday
    currentDate.setDate(currentDate.getDate() - 1);
    this.appSharedService.endDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');

    this.appSharedService.dateRange = [new Date(this.appSharedService.startDate), new Date(this.appSharedService.endDate)];
    console.log("this.dateRange ", this.appSharedService);
    return this.appSharedService.endDate;
  }

  ngOnDestroy() {

  }


}
