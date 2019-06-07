import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../shared/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private appSharedService: AppSharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  
  onSignOut(e) {
    console.log("on sign out");
    this.appSharedService.setUserLoggedIn(false);
    this.router.navigate(['/login']);
  }

}
