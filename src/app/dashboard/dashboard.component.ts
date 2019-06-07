import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppSharedService } from '../shared/services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { DashboardService } from './dashboard.service';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit,OnDestroy {
  private ngUnsubscribe$ = new Subject<void>();
  trendingTags: CloudData[] = [];
  barChartOptions: any;
  data: any;
  doughnutOptions:any;
  doughtnutData: any = {};
  collateralData: any = {};
  totalProposals: number = 0;
  totalProposalCountData:any;
  totalProposalbarChartData:any;
  totalProposalbarChartOptions:any;
  dateRange: any;
  collateralTypes: string[] = [];
  displayProposalBarChart: boolean = false;
  barChartData: any = {};
  options: CloudOptions = {
    width: 350,
    height: 180,
    overflow: false,
  };
  constructor(private router: Router, private acr: ActivatedRoute, private appSharedService: AppSharedService, private dashboardservice: DashboardService,
     public datePipe: DatePipe) {
  }
  ngOnInit() {

    this.barChartData = {
      labels: ["HSBC", "Wells Fargo", "Citi", "Asurion", "RBC", "AQR"],
      datasets: [
         {
              label: 'Total',
              backgroundColor: '#33B5FF',
              borderColor: '#33B5FF',
              data: [5,5,3,5,6,7]
          },
          {
              label: 'Won',
              backgroundColor: '#2543ea',
              borderColor: '#2543ea',
              data: [5,3,3,5,6,7]
          },
          {
            label: 'In Progress',
            backgroundColor: '#FFC733',
            borderColor: '#FFC733',
            data: [5,5,3,5,6,7]
        },
        {
          label: 'Lost',
          backgroundColor: '#FF3333',
          borderColor: '#FF3333',
          data: [4,9,3,5,6,7]
      }
      ]
    }
    
    this.appSharedService.getDashboardDateSubject().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((event: any) => {
      if (this.appSharedService.dateRange && this.appSharedService.dateRange[0] && this.appSharedService.dateRange[1]) {
        this.resetDashboard();
      }
    });
    
    this.doughtnutData = {
      "data": [],
      "labels": [],
      "bgColors": []
    }
    this.totalProposalbarChartData = {
      labels: [],
      datasets: [{ backgroundColor: [], data: [] }]
    }


    this.totalProposalbarChartOptions = {
      legend: {
        display: false
      },
      tooltips: {
        enabled: true
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
            fontColor: '#a3afb9',
            fontFamily: 'Carnas-Light',
            fontSize: 12
          },
          display: true,
          barPercentage: 0.5,
          barThickness: 8,
          maxBarThickness: 8,
          minBarLength: 8,
          gridLines: { display: false }
        }]
      }
    }
    if (!this.appSharedService.startDate || !this.appSharedService.endDate) {
      this.getDefaultDates();
    } else {
      this.appSharedService.dateRange = [new Date(this.appSharedService.startDate), new Date(this.appSharedService.endDate)];
    }
    // this.getSummaryofProposalsByAccount(this.appSharedService.startDate, this.appSharedService.endDate);
    this.gettotalProposalCount(this.appSharedService.startDate, this.appSharedService.endDate);
    this.getCollateralsCount();
    this.getTrendingTags();
   
  }

  resetDashboard(){
    this.trendingTags = [];
    this.collateralTypes = [];
    this.barChartData = {
      labels: [],
      datasets: []
    }
    this.doughtnutData = {
      "data": [],
      "labels": [],
      "bgColors": []
    }
    this.totalProposalbarChartData = {
      labels: [],
      datasets: [{ backgroundColor: [], data: [] }]
    }
    this.displayProposalBarChart = false;
    this.appSharedService.startDate = this.datePipe.transform(this.appSharedService.dateRange[0], 'yyyy-MM-dd');
    this.appSharedService.endDate = this.datePipe.transform(this.appSharedService.dateRange[1], 'yyyy-MM-dd');
    // this.getSummaryofProposalsByAccount(this.appSharedService.startDate, this.appSharedService.endDate);
    this.gettotalProposalCount(this.appSharedService.startDate, this.appSharedService.endDate);
    this.getCollateralsCount();
    this.getTrendingTags();
  }

  getDefaultDates() {
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
  getTrendingTags() {
    this.dashboardservice.getTrendingTags().subscribe((data: any) => {
      for (let index = 0; index < data.length; index++) {
        let item: any = {};
        item.text = data[index].tagName;
        item.weight = data[index].tagCount;
        item.color = this.getRandomColor();
        this.trendingTags.push(item);
      }
      this.trendingTags = this.trendingTags.slice();
    })
  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  // To call Total Proposal By Status
  gettotalProposalCount(startDate: any, endDate: any){
    let requestParams = {
      "startDate": this.datePipe.transform(startDate, 'yyyy-MM-dd'),
      "endDate": this.datePipe.transform(endDate, 'yyyy-MM-dd')
    }
    this.dashboardservice.gettotalProposalCount(requestParams).subscribe((data:any)=>{
      this.totalProposalCountData=data;
      if (data.mapofStatus) {
        for (const key in data.mapofStatus) {
          if (data.mapofStatus.hasOwnProperty(key)) {
            this.totalProposalbarChartData.labels.push(key);
            switch (key) {
              case "In Progress":
                this.totalProposalbarChartData.datasets[0].backgroundColor.push("#ffad66");
                break;
              case "Lost":
                this.totalProposalbarChartData.datasets[0].backgroundColor.push("#fb6262");
                break;
              case "New":
                  this.totalProposalbarChartData.datasets[0].backgroundColor.push("#69ffbd");
                break;
              case "Review":
                  this.totalProposalbarChartData.datasets[0].backgroundColor.push("#62affb");
                break;
              case "Won":
                  this.totalProposalbarChartData.datasets[0].backgroundColor.push("#f8e52d");
                break;
              default:
                break;
            }
            this.totalProposalbarChartData.datasets[0].label= key;
            this.totalProposalbarChartData.datasets[0].data.push(data.mapofStatus[key]);
          }
        }

        this.displayProposalBarChart = true;
      }

    })

  }
    // To call Collateral data
  getCollateralsCount(){
    this.dashboardservice.collateralTypeCount().subscribe((data:any)=>{
      this.collateralData= data;
      for (const key in this.collateralData.mapOfCollateralTypeVsCount) {
        if (this.collateralData.mapOfCollateralTypeVsCount.hasOwnProperty(key)) {
          this.doughtnutData.data.push(this.collateralData.mapOfCollateralTypeVsCount[key]);
          this.doughtnutData.labels.push(key);
          this.collateralTypes.push(key);
          this.doughtnutData.bgColors.push(this.getRandomColor());
        }
      }
      this.data = {
        labels: this.doughtnutData.labels,
        datasets: [
          {
            data: this.doughtnutData.data,
            backgroundColor: this.doughtnutData.bgColors
          }]
      };
      this.doughnutOptions = {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        legend: {
          display: false
        },
        cutoutPercentage: 90,
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        layout: {
          padding: {
            left: 15,
            right: 15,
            top: 15,
            bottom: 15
          }
        }
      }

    })

  }
  getSummaryofProposalsByAccount(startDate: any, endDate: any) {
    let requestParams = {
      "startDate": startDate,
      "endDate": endDate
    }
    this.dashboardservice.getSummaryofProposalsByAccount(requestParams).subscribe((data: any) => {
      this.barChartData["dataInProgrss"] = [];
      this.barChartData["dataWon"] = [];
      this.barChartData["dataReview"] = [];
      this.barChartData["dataLost"] = [];
      this.barChartData["labels"] = [];
      if (data) {
     
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          for (const key in element) {
            if (data.hasOwnProperty(key)) {
              // const element = data[key];
              let item: any = {};
              switch (key) {
                case 'clientName':
                    this.barChartData.labels.push(element[key])
                  break;
                case 'inProgress':
                    item.label = 'In Progress';
                    item.backgroundColor = '#ffad66';
                    item.borderColor = '#ffad66';
                    item.data.push(element[key]);
                  break;
                case 'review':
                    item.label = 'Review';
                    item.backgroundColor = '#62affb';
                    item.borderColor = '#62affb';
                    item.data.push(element[key]);
                  break;
                case 'won':
                    item.label = 'Won';
                    item.backgroundColor = '#f8e52d';
                    item.borderColor = '#f8e52d';
                    item.data.push(element[key]);
                  break;
                case 'lost':
                    item.label = 'Lost';
                    item.backgroundColor = '#fb6262';
                    item.borderColor = '#fb6262';
                    item.data.push(data[key]);
                  break;
              
                default:
                  break;
              }
  
              this.barChartData.datasets.push(item);
              
              
            }
          }
          
        }
        
        // data.forEach((proposal) => {
          
        //   let item: any = {};
        //   item.label = 

        //   datasets: [
        //     {
        //       label: 'In Progress',
        //       backgroundColor: '#ffad66',
        //       borderColor: '#ffad66',
        //       data: this.barChartData.dataInProgrss
        //     },
        //     {
        //       label: 'Review',
        //       backgroundColor: '#62affb',
        //       borderColor: '#62affb',
        //       data: this.barChartData.dataInProgrss
        //     },
        //     {
        //       label: 'Win',
        //       backgroundColor: '#f8e52d',
        //       borderColor: '#f8e52d',
        //       data: this.barChartData.dataInProgrss
        //     },
        //     {
        //       label: 'Lost',
        //       backgroundColor: ' #fb6262',
        //       borderColor: ' #fb6262',
        //       data: this.barChartData.dataLost
        //     }
        //   ]


        //   this.barChartData.dataInProgrss.push(proposal["inProgress"]);
        //   this.barChartData.dataWon.push(proposal["won"]);
        //   this.barChartData.dataReview.push(proposal["review"]);
        //   this.barChartData.dataLost.push(proposal["lost"]);
        //   this.barChartData.labels.push(proposal["clientName"]);
        // });
        // this.totalProposals = data.length;
      }
    })


    this.barChartData = {
      labels: [],
      datasets: []
    }
    this.barChartOptions = {
     
      scales: {
        xAxes: [{
            barPercentage: 0.5,
            barThickness: 8,
            maxBarThickness: 8,
            minBarLength: 8,
            gridLines: {
                offsetGridLines: true
            }
        }]
    }
    }

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }

}

