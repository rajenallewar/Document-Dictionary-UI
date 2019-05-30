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

  constructor(private proposalListService: ProposalListService,
    private router: Router,
    private acr: ActivatedRoute,
    private appSharedService: AppSharedService) { }

  ngOnInit() {
    // this.routeData = {...this.appSharedService.getRouteData()};
  }
  ngOnDestroy() {
    this.appSharedService.clearRouteData();
  }

}
