import { Component, OnInit } from '@angular/core';
import { QaService, Attachment, EmailChain, EmailList, Email } from './qa.service';

@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss'],
  providers: [QaService]
})
export class QaComponent implements OnInit {

  constructor(private qaservice: QaService) { }
  emailList: EmailList;
  ngOnInit() {
    this.getEmailList();
  }

  getEmailList() {
    this.qaservice.getEmailList().subscribe(res => {
      this.emailList = res;
    }, err => {
      console.error(err);
    });
  }

}
