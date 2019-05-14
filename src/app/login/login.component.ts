import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private appSharedService:AppSharedService) { }

  ngOnInit() {
    setTimeout(() => {
      this.appSharedService.setUserLoggedIn(true);
      this.router.navigate(['/dashboard']);
    }, 5000);
  }

}
