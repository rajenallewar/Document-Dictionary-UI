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
  public routeData:any = null;
  public data: any;
  public options: any;
  constructor(private proposalListService: ProposalListService,
    private router: Router,
    private acr: ActivatedRoute,
    private appSharedService: AppSharedService) { }

  ngOnInit() {
    this.routeData = {...this.appSharedService.getRouteData()};
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
    this.getProposalList();
    this.getProposalCount();

  }
  getProposalList(){

  }
  getProposalCount(){
    
  }
  ngOnDestroy() {
    this.appSharedService.clearRouteData();
  }

}
