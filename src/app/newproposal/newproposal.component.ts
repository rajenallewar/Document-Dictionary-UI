import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-newproposal',
  templateUrl: './newproposal.component.html',
  styleUrls: ['./newproposal.component.scss']
})
export class NewproposalComponent implements OnInit {
  proposalForm:FormGroup;
  constructor(private router: Router, private acr:ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.proposalForm = this.formBuilder.group({
      proposalName: new FormControl("", Validators.required),
      clientName: new FormControl("", Validators.required),
      startDate: new FormControl("", Validators.required),
      endDate: new FormControl("", Validators.required),
      requirement: new FormControl("", Validators.required),
      // clientName: new FormControl("", Validators.required)
      
    });
  }
  goBack(){
    this.router.navigate([{outlets:{dialogs:null}}], {relativeTo:this.acr.parent});
  }
}
