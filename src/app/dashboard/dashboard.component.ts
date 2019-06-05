import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../shared/services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { DashboardService } from './dashboard.service';
import { DatePipe } from '@angular/common';
import { CollateralListService } from '../collaterallist/collaterallist.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService,CollateralListService]
})
export class DashboardComponent implements OnInit {
  trendingTags: CloudData[] = [];
  barChartOptions: any;
  data: any;
  doughnutOptions:any;
  doughtnutData: any = {};
  collateralData: any = {};
  totalProposals: number = 0;
  dateRange: any;
  barChartData: any = {};
  options: CloudOptions = {
    width: 350,
    height: 180,
    overflow: false,
  };
  constructor(private router: Router, private acr: ActivatedRoute, private appSharedService: AppSharedService, private dashboardservice: DashboardService,
     public datePipe: DatePipe,private collateralListService: CollateralListService) {
  }
  ngOnInit() {

    this.appSharedService.getDashboardDateSubject().subscribe((event: any) => {
      if (this.appSharedService.dateRange && this.appSharedService.dateRange[0] && this.appSharedService.dateRange[1]) {
        this.getSummaryofProposalsByAccount(this.appSharedService.dateRange[0], this.appSharedService.dateRange[1]);
        this.appSharedService.startDate = this.datePipe.transform(this.appSharedService.dateRange[0], 'yyyy-MM-dd');
        this.appSharedService.endDate = this.datePipe.transform(this.appSharedService.dateRange[1], 'yyyy-MM-dd');
      }
    });

    if (!this.appSharedService.startDate || !this.appSharedService.endDate) {
      this.getDefaultDates();
    } else {
      this.appSharedService.dateRange = [new Date(this.appSharedService.startDate), new Date(this.appSharedService.endDate)];
    }
    this.doughtnutData = {
      "data": [],
      "labels": [],
      "bgColors": []
    }
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
        item.text = data[index].tagsDescription;
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
  getCollateralsCount(){
    this.collateralListService.collateralTypeCount().subscribe((data:any)=>{
      this.collateralData= data;
      for (const key in this.collateralData.mapOfCollateralTypeVsCount) {
        if (this.collateralData.mapOfCollateralTypeVsCount.hasOwnProperty(key)) {
          this.doughtnutData.data.push(this.collateralData.mapOfCollateralTypeVsCount[key]);
          this.doughtnutData.labels.push(key);
          switch (key) {
            case "Brand Stories":
            this.doughtnutData.bgColors.push("#FF8533");
            break;
            case "Capabilities":
            this.doughtnutData.bgColors.push("#9562fb");
              break;
            case "Case Studies":
            this.doughtnutData.bgColors.push("#7bc5f1");
              break;
            case "Corporate Overview":
            this.doughtnutData.bgColors.push("#7bf19b");
              break;
            case "Newsletters":
             this.doughtnutData.bgColors.push("#cafb62");
             break;
            case "Proposals & Presentation":
            this.doughtnutData.bgColors.push("#f1a87b");
              break;
            case "White Papers":
            this.doughtnutData.bgColors.push("#fb6262");
              break;
            default:
              break;
          }
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
      "startDate": this.datePipe.transform(startDate, 'yyyy-MM-dd'),
      "endDate": this.datePipe.transform(endDate, 'yyyy-MM-dd')
    }
    this.dashboardservice.getSummaryofProposalsByAccount(requestParams).subscribe((data: any) => {
      this.barChartData["dataInProgrss"] = [];
      this.barChartData["dataWon"] = [];
      this.barChartData["dataReview"] = [];
      this.barChartData["dataLost"] = [];
      this.barChartData["labels"] = [];
      if (data) {
        data.forEach((proposal) => {
          this.barChartData.dataInProgrss.push(proposal["inProgress"]);
          this.barChartData.dataWon.push(proposal["won"]);
          this.barChartData.dataWon.push(proposal["review"]);
          this.barChartData.dataLost.push(proposal["lost"]);
          this.barChartData.labels.push(proposal["clientName"]);
        });
        this.totalProposals = data.length;
      }
    })
    this.barChartData = {
      labels: this.barChartData.labels,

      datasets: [
        {
          label: 'In Progress',
          backgroundColor: '#ffad66',
          borderColor: '#ffad66',
          data: this.barChartData.dataInProgrss
        },
        {
          label: 'Review',
          backgroundColor: '#62affb',
          borderColor: '#62affb',
          data: this.barChartData.dataInProgrss
        },
        {
          label: 'Win',
          backgroundColor: '#f8e52d',
          borderColor: '#f8e52d',
          data: this.barChartData.dataInProgrss
        },
        {
          label: 'Lost',
          backgroundColor: ' #fb6262',
          borderColor: ' #fb6262',
          data: this.barChartData.dataLost
        }
      ]
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

}

