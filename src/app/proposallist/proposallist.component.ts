import { Component, OnInit } from '@angular/core';
import { ProposalListService } from './proposallist.service';
import { AppSharedService } from '../shared/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private proposalListService: ProposalListService,
    private router: Router,
    private acr: ActivatedRoute,
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


    this.barChartData={
      labels: [],
      datasets: [{backgroundColor:[],data:[]}]
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
            fontSize:10
          },
          display: true,
          barPercentage: 0.5,
          barThickness: 5,
          maxBarThickness: 5,
          minBarLength: 5,
          gridLines:{display:false}
        }]
      }
    }

    this.getProposalList();
    this.getProposalCount();
  }
  getProposalList() {

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
  ngOnDestroy() {
    this.appSharedService.clearRouteData();
  }
}
