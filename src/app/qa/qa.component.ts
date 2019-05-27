import { Component, OnInit, HostListener } from '@angular/core';
import { QaService, Attachment, EmailChain, Email } from './qa.service';
import { SearchPipe } from './search.pipe';
import { DeviceDetectorService } from 'ngx-device-detector';
import {NgSwitch} from '@angular/common';

declare let require: any;

@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss'],
  providers: [QaService, NgSwitch],
})
export class QaComponent implements OnInit {

  constructor(private qaservice: QaService, private deviceService: DeviceDetectorService) {
    this.setScreenSize();
  }
  emailList: EmailChain[];
  selectedEmailChain: EmailChain;
  list = ['', '', '', '', '', '', '', '', '', ''];
  defaultSelIndex = 0;
  searchQuery = '';
  isMobile: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setScreenSize();
  }
  ngOnInit() {
    this.getEmailList();
  }

  getEmailList() {
    this.qaservice.getEmailList().subscribe(res => {
      this.emailList = res;
      console.log(this.emailList);
      this.selectedEmailChain = this.emailList[this.defaultSelIndex];
      console.log(this.selectedEmailChain[0]);
    }, err => {
      console.error(err);
    });
  }

  setScreenSize() {
    const deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    console.log(deviceInfo);
    console.log(this.isMobile);
  }
}
