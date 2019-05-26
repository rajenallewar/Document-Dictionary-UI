import { Component, OnInit } from '@angular/core';
import { QaService, Attachment, EmailChain, Email } from './qa.service';
import { SearchPipe } from './search.pipe';

@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss'],
  providers: [QaService]
})
export class QaComponent implements OnInit {

  constructor(private qaservice: QaService) { }
  emailList: EmailChain[];
  selectedEmailChain: EmailChain;
  list = ['', '', '', '', '', '', '', '', '', ''];
  defaultSelIndex = 0;
  searchQuery = '';

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
}
