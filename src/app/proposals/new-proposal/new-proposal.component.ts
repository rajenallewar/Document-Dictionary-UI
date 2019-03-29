import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DocumentServices } from 'src/app/services/document.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-proposal',
  templateUrl: './new-proposal.component.html',
  styleUrls: ['./new-proposal.component.scss']
})
export class NewProposalComponent  {

 // form_modal: HTMLElement = document.getElementById('uploadModal');
  constructor(private _docServices: DocumentServices, private router: Router) { }

  newFileForm: FormGroup = new FormGroup({
    clientName: new FormControl("", Validators.required),
    startDate: new FormControl("", Validators.required),
    endDate: new FormControl("", Validators.required),
    requirement: new FormControl("", Validators.required),
    region: new FormControl("", Validators.required),
    status: new FormControl("", Validators.required),
   
});

  get f() { return this.newFileForm.controls; }

  onSubmit(form: any) {
  this._docServices.saveDocument(form.value).subscribe(data => {
      this.router.navigateByUrl('/viewproposal');
    }, (err) => {
    });
  }

}
