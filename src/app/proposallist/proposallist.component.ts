import { Component, OnInit, ViewChild } from '@angular/core';
import { ProposalListService } from './proposallist.service';
import { AppSharedService } from '../shared/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-proposallist',
  templateUrl: './proposallist.component.html',
  styleUrls: ['./proposallist.component.scss'],
  providers: [ProposalListService]

})
export class ProposallistComponent implements OnInit {
  public routeData: any = null;
  public lineChartData: any;
  public lineChartOptions: any;
  public displayLineChart: any = false;
  proposalData: any = {};

  public barChartData: any;
  public barChartOptions: any;

  defaultLimit = 10;
  defaultOffset = 1;
  displayRecordSize = 10;
  totalRecords = 10;
  proposalList: any;
  displayProposalList: any;
  @ViewChild('paginator') paginator: any;

  searchCriteria: any = {
    rangeDates:null,
    clientName:null,
    status:null,
    region:null,
  }
  clientListOptions:any[];
  regionListOptions:any[];
  statusListOptions:any[];
  endDate: string;
  startDate: string;

  constructor(private proposalListService: ProposalListService,
    private router: Router,
    private acr: ActivatedRoute,
    public datePipe: DatePipe,
    private appSharedService: AppSharedService) { }

  ngOnInit() {
    this.routeData = { ...this.appSharedService.getRouteData() };
    this.lineChartData = {
      labels: [],
      datasets: []
    };

    this.lineChartOptions = {
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


    this.barChartData = {
      labels: [],
      datasets: [{ backgroundColor: [], data: [] }]
    }


    this.barChartOptions = {
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      hover: {
        mode: null
      },
      title: {
        display: false,
        text: ''
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          ticks: {
            fontColor: '#a1aed1',
            fontFamily: 'Carnas-Light',
            fontSize: 10
          },
          display: true,
          barPercentage: 0.5,
          barThickness: 5,
          maxBarThickness: 5,
          minBarLength: 5,
          gridLines: { display: false }
        }]
      }
    }


    this.clientListOptions = [
      {label:"All",value:null},
      {label:"HSBC",value:"HSBC"},
      {label:"Wells Fargo",value:"Wells Fargo"},
      {label:"Asurian",value:"Asurian"},
      {label:"Citi",value:"Citi"},
    ];

    this.regionListOptions = [
      {label:"All",value:null},
      {label:"New York",value:"New York"},
      {label:"Charlotte",value:"Charlotte"},
      {label:"Singapore",value:"Singapore"},
      {label:"US Central",value:"US Central"},
      {label:"Amsterdam",value:"Amsterdam"},
      {label:"UAE",value:"UAE"},
      {label:"Paris",value:"Paris"},
    ];

    this.statusListOptions = [
      {label:"All",value:null},
      {label:"Lost",value:"Lost"},
      {label:"New",value:"New"},
      {label:"Won",value:"Won"},
      {label:"In-Progress",value:"In-Progress"},
      {label:"Review",value:"Review"}
    ];


    this.getDefaultDates();
    let startDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    let endDate =  this.datePipe.transform(this.endDate, 'yyyy-MM-dd');

    this.searchCriteria.clientName = null;
    this.searchCriteria.status = null;
    this.searchCriteria.region = null;

    let obj: any = {
      "startDate": startDate,
      "endDate": endDate,
      "pageSearch": {
        "limit": this.defaultLimit,
        "offset": this.defaultOffset,
        "mapOfSearchKeyVsValue": {
          "clientName": this.searchCriteria.clientName,
          "status": this.searchCriteria.status,
          "region": this.searchCriteria.region,
        }
      }
    }
    this.getProposalList(obj);
    this.getProposalCount();
  }

  getDefaultDates() {
    let currentDate = new Date();
    
    // //Set end date as of yesterday
    // currentDate.setDate(currentDate.getDate() - 1);
    // this.endDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
  
    // //Set start date as 1 month before
    // currentDate.setMonth(currentDate.getMonth() - 1);
    // this.startDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');

    this.startDate = "2019-01-01";
    this.endDate = "2019-12-12";

    this.searchCriteria.rangeDates=[new Date(this.startDate), new Date(this.endDate)];
    
  }
  onSearch(event) {
    let startDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    let endDate =  this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    let obj: any = {
      "startDate": startDate,
      "endDate": endDate,
      "pageSearch": {
        "limit": this.defaultLimit,
        "offset": this.defaultOffset,
        "mapOfSearchKeyVsValue": {
          "clientName": this.searchCriteria.clientName,
          "status": this.searchCriteria.status,
          "region": this.searchCriteria.region,
        }
      }
    }
    this.getProposalList(obj);
  }

  getProposalList(obj) {
    this.proposalListService.getProposalList(obj).subscribe((response: any) => {
      this.totalRecords = response.totalCountOfProposals || 10;
      this.proposalList = response.listOfProposalUIModel;
      this.displayProposalList = this.proposalList.slice(0, this.displayRecordSize);
    });
  }

  paginate(event) {
    let startDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    let endDate =  this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    let obj: any = {
      "startDate": startDate,
      "endDate": endDate,
      "pageSearch": {
        "limit": event.first + 1,
        "offset": event.rows,
        "mapOfSearchKeyVsValue": {
          "clientName": this.searchCriteria.clientName,
          "status": this.searchCriteria.status,
          "region": this.searchCriteria.region,
        }
      }
    }
    this.getProposalList(obj);
  }

  resetCollateralListing() {

    this.getDefaultDates();
    let startDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    let endDate =  this.datePipe.transform(this.endDate, 'yyyy-MM-dd');

    this.searchCriteria.clientName = null;
    this.searchCriteria.status = null;
    this.searchCriteria.region = null;
   
    this.paginator && this.paginator.changePageToFirst();
    let obj: any = {
      "startDate": startDate,
      "endDate": endDate,
      "pageSearch": {
        "limit": this.defaultLimit,
        "offset": this.defaultOffset,
        "mapOfSearchKeyVsValue": {
          "clientName": this.searchCriteria.clientName,
          "status": this.searchCriteria.status,
          "region": this.searchCriteria.region,
        }
      }
    }
    this.getProposalList(obj);
    this.getProposalCount();
  }

  getProposalCount() {
    this.proposalListService.countOfProposalStatus().subscribe((response: any) => {
      console.log(response);
      this.proposalData.totalAvailableProposals = response.totalAvailableProposals;
      if (response.mapofStatus) {
        this.proposalData.statusCounts = [];
        for (const key in response.mapofStatus) {
          if (response.mapofStatus.hasOwnProperty(key)) {
            let item: any = {};
            item.label = `${key} Proposals`;
            let totalCount = +response.totalAvailableProposals;
            let count = +response.mapofStatus[key];
            let perCount = 100 * count / totalCount;
            item.data = [perCount];
            item.count = +response.mapofStatus[key];

            switch (key) {
              case "In-Progress":
                item.backgroundColor = "#ffad66";
                break;
              case "Lost":
                item.backgroundColor = "#fb6262";
                break;
              case "New":
                item.backgroundColor = "#69ffbd";
                break;
              case "Review":
                item.backgroundColor = "#62affb";
                break;
              case "Won":
                item.backgroundColor = "#f8e52d";
                break;
              default:
                break;
            }
            this.lineChartData.datasets.push(item);
            this.proposalData.statusCounts.push(item);

          }
        }
        this.lineChartData.datasets = this.lineChartData.datasets.slice();
      }

      if (response.mapOfBu) {
        for (const key in response.mapOfBu) {
          if (response.mapOfBu.hasOwnProperty(key)) {
            this.barChartData.labels.push(key);
            this.barChartData.datasets[0].backgroundColor.push("#b6d2ff");
            this.barChartData.datasets[0].data.push(+response.mapOfBu[key]);
          }
        }
      }
      console.log(this.barChartData);
      this.displayLineChart = true;
    });
  }

  onEdit(event) {
    console.log("onEdit :",event);
    this.appSharedService.setRouteData({
      "openType":"edit",
      "proposal":this.displayProposalList[event.index]
    });
    setTimeout(() => {
      this.router.navigate([{outlets:{dialogs:'newproposal'}}], {relativeTo:this.acr.parent});
    }, 0);
  }
  onAdd(event) {
    let proposalId = this.displayProposalList[event.index].proposalId;
    let proposalName = this.displayProposalList[event.index].proposalName;
    this.appSharedService.setRouteData({
      "openType":"newFromPraposal",
      "proposalId":proposalId,
      "proposalName":proposalName,
    });
    setTimeout(() => {
      this.router.navigate([{outlets:{dialogs:'uploadcollateral'}}], {relativeTo:this.acr.parent});
    }, 0);
  }
  onViewCollaterals(event){
    console.log("onViewCollaterals :", event);
  }
  ngOnDestroy() {
    this.appSharedService.clearRouteData();
  }
}
