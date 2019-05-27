import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../shared/services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router, private acr:ActivatedRoute, private appSharedService:AppSharedService) { }

  ngOnInit() {
    setTimeout(() => {
      
      this.router.navigate([{outlets:{dialogs:'viewcollateral'}}], {relativeTo:this.acr.parent});
    }, 1000);
  }

}
