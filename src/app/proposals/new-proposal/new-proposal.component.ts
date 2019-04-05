import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProposalServices } from 'src/app/services/proposal.service';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-new-proposal',
  templateUrl: './new-proposal.component.html',
  styleUrls: ['./new-proposal.component.scss']
})
export class NewProposalComponent  {
  submitted = false;
  uploadedFiles: any[] = [];

  constructor(private proposals:ProposalServices, private router: Router) {
    
   }
  
  newFileForm: FormGroup = new FormGroup({
    clientName: new FormControl("", Validators.required),
    startDate: new FormControl("", Validators.required),
    endDate: new FormControl("", Validators.required),
    requirement: new FormControl("", Validators.required),
    region: new FormControl("", Validators.required),
    status: new FormControl("", Validators.required),
   
});
 get f() {return this.newFileForm.controls; }

  onSubmit(form: any) {
  console.log("form submited")
  this.submitted = true;
  this.proposals.saveProposals(form.value).subscribe(data => {
       this.router.navigateByUrl('/viewproposal');

      console.log("success ", data)
     
    });

    // if (this.newFileForm.invalid) {
    //   return;
    // }
    

  }
}

