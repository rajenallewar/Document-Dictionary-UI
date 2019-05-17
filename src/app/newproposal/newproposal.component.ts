import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newproposal',
  templateUrl: './newproposal.component.html',
  styleUrls: ['./newproposal.component.scss']
})
export class NewproposalComponent implements OnInit {

  constructor(private router: Router, private acr:ActivatedRoute,) { }

  ngOnInit() {
  }
  goBack(){
    this.router.navigate([{outlets:{dialogs:null}}], {relativeTo:this.acr.parent});
  }
}
