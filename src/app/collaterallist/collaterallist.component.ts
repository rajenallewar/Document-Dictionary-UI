import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CollateralListService } from './collaterallist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSharedService } from '../shared/services/shared.service';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import randomColor from 'randomColor';

@Component({
  selector: 'app-collaterallist',
  templateUrl: './collaterallist.component.html',
  styleUrls: ['./collaterallist.component.scss'],
  providers: [CollateralListService]
})
export class CollaterallistComponent implements OnInit, OnDestroy {
  public data: any;
  public options: any;
  public collateralData: any = {};
  public collateralList: any = [];
  public displayCollateralList: any = [];
  public routeData: any = null;
  displayLineChart: boolean = false;
  displayRecordSize = 10;
  totalRecords = 10;
  searchTimer;
  tagSearch = null;
  proposalId = null;
  private ngUnsubscribe$ = new Subject<void>();
  collateralColorMap = {};

  @ViewChild('paginator') paginator: any;

  constructor(private collateralListService: CollateralListService,
    private router: Router,
    private spinnerService: SpinnerService,
    private toastr: ToastrService,
    private acr: ActivatedRoute,
    private appSharedService: AppSharedService) { }

  async ngOnInit() {

    this.routeData = { ...this.appSharedService.getRouteData() };

    this.data = {
      labels: [],
      datasets: []
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0
      },
      hover: {
        mode: null,
        animationDuration: 0
      },
      responsiveAnimationDuration: 0,
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      scales: {
        xAxes: [{
          display: false,
          stacked: true
        }],
        yAxes: [{
          stacked: true,
          display: false,
          barPercentage: 0.5,
          barThickness: 3,
          maxBarThickness: 3,
          minBarLength: 3
        }]
      }
    };

    await this.getCollateralsCount();
    let req;

    if (this.routeData) {
      if(this.routeData.proposalId) {
        this.proposalId = this.routeData.proposalId;
        req = {
          "limit": 10,
          "offset": 1,
          "mapOfSearchKeyVsValue": {
            "proposalId": this.proposalId
          }
        }
      } else if(this.routeData.tagName) {
        this.tagSearch = this.routeData.tagName;
        req = {
          "limit": 10,
          "offset": 1,
          "mapOfSearchKeyVsValue": {
            "tags": this.tagSearch
          }
        }
      } else {
        req = {
          "limit": 10,
          "offset": 1,
          "mapOfSearchKeyVsValue": null
        }
      }
    } else {
      req = {
        "limit": 10,
        "offset": 1,
        "mapOfSearchKeyVsValue": null
      }
    }
    this.getCollateralList(req);

    this.appSharedService.getNewCollateralCloseEvent().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((flag) => {
      if (flag) {
        this.resetCollateralListing();
      }
    });
  }
  async getCollateralsCount() {
    this.spinnerService.spinner(true);

    let response: any = await this.collateralListService.collateralTypeCount();
    this.spinnerService.spinner(true);
    if (response) {
      console.log("In collateralTypeCount");
      this.collateralData.totalCollateralsCount = response.totalCollateralsCount;
      if (response.mapOfCollateralTypeVsCount) {
        this.collateralData.collateralCounts = [];
        for (const key in response.mapOfCollateralTypeVsCount) {
          if (response.mapOfCollateralTypeVsCount.hasOwnProperty(key)) {
            let item: any = {};
            item.label = key;
            let totalCount = +response.totalCollateralsCount;
            let count = +response.mapOfCollateralTypeVsCount[key];
            let perCount = 100 * count / totalCount;
            item.data = [perCount];
            item.count = +response.mapOfCollateralTypeVsCount[key];
            let rColor = randomColor();
            item.backgroundColor = rColor;
            this.collateralColorMap[key] = rColor;
            this.data.datasets.push(item);
            this.collateralData.collateralCounts.push(item);
          }
        }

        this.data.datasets = this.data.datasets.slice();
      }
      this.displayLineChart = true;
    }
  }
  getCollateralList(req) {
    console.log("In getCollateralList");
    this.spinnerService.spinner(true);
    this.collateralListService.getCollaterals(req).subscribe((response: any) => {
      if (response) {
        this.totalRecords = response.totalCount || 10;
        this.collateralList = response.listOfCollateralUIModel;
        this.collateralList.forEach((element: any) => {

          let collateralTypeName = element.collateralTypeUIModel ? element.collateralTypeUIModel.collateralType : '';
          if (collateralTypeName) {
            element.collateralTypeUIModel.color = this.collateralColorMap[collateralTypeName];
          }
        });
        this.displayCollateralList = this.collateralList.slice(0, this.displayRecordSize);
      }
    }, ((err) => { }), (() => { this.spinnerService.spinner(false); }));
  }

  async resetCollateralListing() {
    var event = new Event('reset');
    this.paginator && this.paginator.changePageToFirst(event);
    let req = {
      "limit": 10,
      "offset": 1,
      "mapOfSearchKeyVsValue": null
    }
    await this.getCollateralsCount();
    this.getCollateralList(req);
  }

  onTagSearch(event) {
    let req = {
      "limit": 10,
      "offset": 1,
      "mapOfSearchKeyVsValue": null
    }
    if (event.target.value) {
      let value = event.target.value.trim();
      req['mapOfSearchKeyVsValue'] = { "tags": value };
    }
    this.getCollateralList(req);
  }

  paginate(event) {
    let req = {
      "offset": event.first + 1,
      "limit": event.rows,
      "mapOfSearchKeyVsValue": null
    }

    if (this.proposalId) {
      req['mapOfSearchKeyVsValue'] = { "proposalId": this.proposalId };
    } else if (this.tagSearch) {
      req['mapOfSearchKeyVsValue'] = { "tags": this.tagSearch };
    }
    this.getCollateralList(req);
  }

  onDelete(event: any) {
    let collateralId = this.collateralList[event.index].collateralId;
    this.spinnerService.spinner(true);
    this.collateralListService.deleteCollateral(collateralId).subscribe(() => {
      this.toastr.error('Colateral Deleted', '', this.appSharedService.toastrOption);
      this.resetCollateralListing();
    }, ((err) => { }), (() => { this.spinnerService.spinner(false); }));
  }
  onEdit(event) {
    console.log("onEdit", event);
    this.appSharedService.setRouteData({
      "openType": "edit",
      "index": event.index,
      "collateralObj": this.collateralList[event.index]
    });
    setTimeout(() => {
      this.router.navigate([{ outlets: { dialogs: 'uploadcollateral' } }], { relativeTo: this.acr.parent });
    }, 0);
  }
  onView(event) {
    console.log("onView", event);
    this.appSharedService.setRouteData({
      "index": event.index,
      "collateralObj": this.collateralList[event.index]
    });
    setTimeout(() => {
      this.router.navigate([{ outlets: { dialogs: 'viewcollateral' } }], { relativeTo: this.acr.parent });
    }, 0);
  }
  ngOnDestroy() {
    this.appSharedService.clearRouteData();
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }

}
