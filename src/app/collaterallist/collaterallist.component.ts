import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CollateralListService } from './collaterallist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSharedService } from '../shared/services/shared.service';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import CollateralColorMap from './../shared/utils/collateral.color.map';
import { ConfirmationService } from 'primeng/api';
import { ViewCollateralService } from '../viewcollateral/viewcollateral.service';
import { downloadFile } from '../shared/utils/app.utils';
import { AutoComplete } from 'primeng/autocomplete';


@Component({
  selector: 'app-collaterallist',
  templateUrl: './collaterallist.component.html',
  styleUrls: ['./collaterallist.component.scss'],
  providers: [CollateralListService, ConfirmationService, ViewCollateralService]
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
  proposalName = null;
  msgs: any;
  private ngUnsubscribe$ = new Subject<void>();
  collateralColorMapObj: any = new CollateralColorMap();
  showSearchBar:boolean =true;
  advancedSearchList = [];
  allTagsList=[];
  tagList=[];
  isInvalidValue:boolean =false;
  @ViewChild('paginator') paginator: any;
  @ViewChild('searchAuto') searchAuto: AutoComplete;

  constructor(private collateralListService: CollateralListService,
    private router: Router,
    private spinnerService: SpinnerService,
    private toastr: ToastrService,
    private acr: ActivatedRoute,
    private appSharedService: AppSharedService,
    private confirmationService: ConfirmationService,
    private viewCollateralService: ViewCollateralService) { }

  ngOnInit() {

    this.routeData = { ...this.appSharedService.getRouteData() };

    this.data = {
      labels: [],
      datasets: []
    };

    this.options = {
      cornerRadius: 20,
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

    // this.getCollateralsCount();
    let req;

    if (this.routeData) {
      if (this.routeData.proposalId) {
        this.showSearchBar = false;
        this.proposalId = this.routeData.proposalId;
        this.proposalName = this.routeData.proposalName;
        req = {
          "limit": 10,
          "offset": 1,
          "mapOfSearchKeyVsValue": {
            "proposalId": this.proposalId
          }
        }
      } else if (this.routeData.tagName) {
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
    this.getAllTagsForAutoComplete(req);

    // this.routeData && this.routeData.tagName ? this.addToAdvancedList() : this.getCollateralList(req);
    // this.getCollateralList(req);
    this.appSharedService.getViewCollateralCloseEvent().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((flag) => {
      if (flag) {
        this.resetCollateralListing();
      }
    });

    this.appSharedService.getNewCollateralCloseEvent().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((flag) => {
      if (flag) {
        this.resetCollateralListing();
      }
    });
  }
  getCollateralsCount(req) {
    this.data = {
      labels: [],
      datasets: []
    };
    this.spinnerService.spinner(true);
    // let req = {
    //   "dateRangeUIModel": null
    // }
    this.collateralListService.collateralTypeCount(req).subscribe((response: any) => {
      this.spinnerService.spinner(false);
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
              let rColor = this.collateralColorMapObj.getColor(this.collateralColorMapObj.collateralCMap, key);
              item.backgroundColor = rColor;
              // this.collateralColorMap[key] = rColor;
              this.data.datasets.push(item);
              this.collateralData.collateralCounts.push(item);
            }
          }

          this.data.datasets = this.data.datasets.slice();
        }
        this.displayLineChart = true;
      }
    }, ((err) => { }), (() => { this.spinnerService.spinner(false); }));
  }
  getCollateralList(req) {
    console.log("In getCollateralList");
    this.spinnerService.spinner(true);
    console.log('Request Object:', req);
    this.collateralListService.getCollaterals(req).subscribe((response: any) => {
      if (response) {
        this.totalRecords = response.totalCount || 10;
        this.collateralList = response.listOfCollateralUIModel;
        this.collateralList.forEach((element: any) => {

          let collateralTypeName = element.collateralTypeUIModel ? element.collateralTypeUIModel.collateralType : '';
          if (collateralTypeName) {
            element.collateralTypeUIModel.color = this.collateralColorMapObj.getColor(this.collateralColorMapObj.collateralCMap, collateralTypeName);
          }
        });
        this.displayCollateralList = this.collateralList.slice(0, this.displayRecordSize);
        const countReq = {
          "dateRangeUIModel": null,
          "proposalId": req && req.mapOfSearchKeyVsValue && req.mapOfSearchKeyVsValue.proposalId ? req.mapOfSearchKeyVsValue.proposalId : null,
          "tagNames": req && req.mapOfSearchKeyVsValue && req.mapOfSearchKeyVsValue.tags ? req.mapOfSearchKeyVsValue.tags : null,
          "collateralType": req && req.mapOfSearchKeyVsValue && req.mapOfSearchKeyVsValue.Type ? req.mapOfSearchKeyVsValue.Type : null,
        };
        this.getCollateralsCount(countReq);
      }
    }, ((err) => { }), (() => { this.spinnerService.spinner(false); }));
  }

  resetCollateralListing() {
    var event = new Event('reset');
    this.paginator && this.paginator.changePageToFirst(event);
    let req = {
      "limit": 10,
      "offset": 1,
      "mapOfSearchKeyVsValue": null
    }
    this.tagSearch = "";
    this.displayLineChart = false;
    // this.getCollateralsCount();
    this.getCollateralList(req);
  }

  onTagSearch(event) {
    this.searchAutoComplete(event.query);  
  }

  searchAutoComplete(searchValue) {
    this.tagList = this.allTagsList.filter((c) =>c.tagName.toString().toLowerCase().startsWith(searchValue.toLowerCase()));
  }

  getTagDetails(searchTags){
    let req = {
      "limit": 10,
      "offset": 1,
      "mapOfSearchKeyVsValue": null
    }
    if (searchTags.length>0) {
      let value = searchTags.join();
      req['mapOfSearchKeyVsValue'] = { "tags": value };
    }
    
    this.getCollateralList(req);
  }
  onCollateralTypeClick(value : string) {
    if(this.showSearchBar) {
      let req = {
        "limit": 10,
        "offset": 1,
        "mapOfSearchKeyVsValue": null
      }
      if (value) {
        let trimmedValue = value.trim();
        req['mapOfSearchKeyVsValue'] = { "Type": trimmedValue };
      }
      this.advancedSearchList = [];
      this.tagSearch = '';
      this.getCollateralList(req);
    }
  }
  onSearchReset(){
    this.tagSearch = "";
    this.advancedSearchList=[];
    let req = {
      "limit": 10,
      "offset": 1,
      "mapOfSearchKeyVsValue": null
    }
    this.getCollateralList(req);
  }

  addToAdvancedList(){
    let value;
    let searchValue = this.tagSearch; 
    if(this.tagSearch){
      if(typeof(this.tagSearch)==="string"){
        value = (this.allTagsList.filter(c =>(c.tagName.toString().toLowerCase()===searchValue.toLowerCase())))[0];
        if(!value){
          this.isInvalidValue = true;
          return;
        }else{
          this.isInvalidValue = false;
        }
      }else{
        value = searchValue;
      }
      this.addAndduplicateTagInList(value);
      let tagValues= this.advancedSearchList.map(tag=>tag.tagName);
      this.getTagDetails(tagValues);
    }else{
      this.toastr.error('Enter valid Tag Name to Filter');
    }
    this.tagSearch ='';
    this.searchAuto.hide();
  }

  addAndduplicateTagInList(value){
    if(this.advancedSearchList.filter(ele=> (ele.tagName.toString().toLowerCase() === value.tagName.toString().toLowerCase())).length == 0){
      this.advancedSearchList=[...this.advancedSearchList,value];
    }else{
      this.toastr.error('Already added',value.tagName);
    } 
  }

  getAllTagsForAutoComplete(req) {
    this.collateralListService.getAllTags().subscribe((res: any) => {
      this.allTagsList = res;
      this.routeData && this.routeData.tagName ? this.addToAdvancedList() : this.getCollateralList(req);
    });
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
    this.confirmationService.confirm({
      message: 'Do you want to delete this Collateral?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      },
      accept: () => {
        let collateralId = this.collateralList[event.index].collateralId;
        this.spinnerService.spinner(true);
        this.collateralListService.deleteCollateral(collateralId).subscribe(() => {
          this.toastr.error('Colateral Deleted', '', this.appSharedService.toastrOption);
          this.resetCollateralListing();
        }, ((err) => { }), (() => { this.spinnerService.spinner(false); }));

        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
      }
    });
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
  onDownload(event) {
    console.log('onDownload', event);
    this.spinnerService.spinner(true);
    const downloadObj = {
      fileName: this.collateralList[event.index].fileName,
    };

    this.viewCollateralService.downloadFile(downloadObj).subscribe((data: any) => {

      downloadFile(data, downloadObj.fileName, 'application/octet-stream');
      this.spinnerService.spinner(false);
    });
  }
  onReset(event) {
    this.showSearchBar = true;
    this.resetCollateralListing();
  }
  onProposalGoback(event) {
    setTimeout(() => {
      this.router.navigate(['/dms/proposals']);
    }, 10);
  }

  removeSearchItem(index){
    this.advancedSearchList.splice(index,1);
    let tagValues= this.advancedSearchList.map(tag=>tag.tagName);
    this.getTagDetails(tagValues);
  }

  ngOnDestroy() {
    this.appSharedService.clearRouteData();
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }

  onResetSearch(){
      this.advancedSearchList =[];
  }

}
