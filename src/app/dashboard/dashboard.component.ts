import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../shared/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router, private appSharedService:AppSharedService) { }

  ngOnInit() {
    setTimeout(() => {
      this.appSharedService.setUserLoggedIn(true);
      this.router.navigate(['/proposals']);
    }, 3000);
  }

}
