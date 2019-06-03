import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../shared/services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
  trendingTags:any;
  data: CloudData[];
  options: CloudOptions = {
    width: 350,
    height: 180,
    overflow: false,
  };
  constructor(private router:Router, private acr:ActivatedRoute, private appSharedService:AppSharedService, private dashboardservice:DashboardService) {
    this.data = [
      {text: 'FX', weight: 8,  color: '#ffaaee' },
      {text: 'LOAN', weight: 12, },
      {text: 'SALES', weight: 6,  color: '#ff0000'},
      {text: 'AZURE', weight: 10 },
      {text: 'AWS', weight: 8, color: '#00ff00'},
      {text: 'PCF', weight: 16 },
      {text: 'HADOOP', weight: 8, color: '#800080'},
      {text: 'SALES', weight: 6,  color: '#ff0000'},
      {text: 'AZURE', weight: 10 }
    ];
  }
  ngOnInit() {
  //  this.getTrendingTags();
  
  }
  getTrendingTags(){
    this.dashboardservice.getTrendingTags().subscribe((data)=>{
         this.trendingTags=data;

    })
  }
  
}

