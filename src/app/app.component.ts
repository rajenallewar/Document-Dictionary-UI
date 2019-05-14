import { Component } from '@angular/core';
import { AppSharedService } from './shared/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public appSharedService:AppSharedService) {}
}
