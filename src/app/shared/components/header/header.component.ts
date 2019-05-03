import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logoUrl = "assets/images/synechron_logo-black.png";
  constructor() { }

  ngOnInit() {
  }

}
