import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CollateralListService } from './collaterallist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSharedService } from '../shared/services/shared.service';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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

  @ViewChild('paginator') paginator: any;

  constructor(private collateralListService: CollateralListService,
    private router: Router,
    private spinnerService: SpinnerService,
    private toastr: ToastrService,
    private acr: ActivatedRoute,
    private appSharedService: AppSharedService) { }

  ngOnInit() {
    this.routeData = { ...this.appSharedService.getRouteData() };

    this.data = {
      labels: [],
      datasets: []
    };

    this.options = {
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      hover: {
        mode: null
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
    // console.log("this.routeData :",this.routeData);
    let req;
    if(this.routeData && this.routeData.proposalId) {
      this.proposalId = this.routeData.proposalId;
      req = {
        "limit": 10,
        "offset": 1,
        "mapOfSearchKeyVsValue": {
          "proposalId":this.proposalId
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
    this.getCollateralsCount();

    this.appSharedService.getNewCollateralCloseEvent().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((flag) => {
      if (flag) {
        this.resetCollateralListing();
      }
    });


  }
  getCollateralsCount() {
    this.spinnerService.spinner(true);
    this.collateralListService.collateralTypeCount().subscribe((response: any) => {
      if (response) {
        // this.collateralData = response;
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


              switch (key) {
                case "Brand Stories":
                  item.backgroundColor = "#FF8533";
                  break;
                case "Capabilities":
                  item.backgroundColor = "#9562fb";
                  break;
                case "Case Studies":
                  item.backgroundColor = "#7bc5f1";
                  break;
                case "Corporate Overview":
                  item.backgroundColor = "#7bf19b";
                  break;
                case "Newsletters":
                  item.backgroundColor = "#cafb62";
                  break;
                case "Proposals & Presentation":
                  item.backgroundColor = "#f1a87b";
                  break;
                case "White Papers":
                  item.backgroundColor = "#fb6262";
                  break;
                default:
                  break;
              }
              this.data.datasets.push(item);
              this.collateralData.collateralCounts.push(item);
            }
          }

          this.data.datasets = this.data.datasets.slice();
        }
      }
      console.log(this.data);
      this.displayLineChart = true;
    },((err)=>{}),(()=>{this.spinnerService.spinner(false);}));
  }
  getCollateralList(req) {
    this.spinnerService.spinner(true);
    this.collateralListService.getCollaterals(req).subscribe((response: any) => {
      if (response) {
        this.totalRecords = response.totalCount || 10;
        this.collateralList = response.listOfCollateralUIModel;
        this.displayCollateralList = this.collateralList.slice(0, this.displayRecordSize);
      }
    },((err)=>{}),(()=>{this.spinnerService.spinner(false);}));
  }

  resetCollateralListing() {
    console.log("this.paginator", this.paginator);
    var event = new Event('reset');
    this.paginator && this.paginator.changePageToFirst(event);
    let req = {
      "limit": 10,
      "offset": 1,
      "mapOfSearchKeyVsValue": null
    }
    this.getCollateralList(req);
    this.getCollateralsCount();
  }

  onTagSearch(event) {
    let req = {
      "limit": 10,
      "offset": 1,
      "mapOfSearchKeyVsValue": null
    }
    if (event.target.value) {
      let value = event.target.value.trim();
      req['mapOfSearchKeyVsValue']={"tags":value};
    } 
    this.getCollateralList(req);
  }

  paginate(event) {
    let req = {
      "offset": event.first + 1,
      "limit": event.rows,
      "mapOfSearchKeyVsValue": null
    }

    if(this.proposalId) {
      req['mapOfSearchKeyVsValue']={"proposalId":this.proposalId};
    } else if(this.tagSearch){
      req['mapOfSearchKeyVsValue']={"tags":this.tagSearch};
    }
    this.getCollateralList(req);
  }

  onDelete(event: any) {
    let collateralId = this.collateralList[event.index].collateralId;
    this.spinnerService.spinner(true);
    this.collateralListService.deleteCollateral(collateralId).subscribe(() => {
      this.toastr.error('Colateral Deleted', '', this.appSharedService.toastrOption);
      this.resetCollateralListing();
    },((err)=>{}),(()=>{this.spinnerService.spinner(false);}));
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
