import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProposalServices } from 'src/app/services/proposal.service';
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
    proposalName: new FormControl("", Validators.required),
    clientName: new FormControl("", Validators.required),
    startDate: new FormControl("", Validators.required),
    endDate: new FormControl("", Validators.required),
    requirement: new FormControl("", Validators.required),
    region: new FormControl("", Validators.required),
    cost: new FormControl("", Validators.required),
    status: new FormControl("", Validators.required),
   
});
 get f() {return this.newFileForm.controls; }

  onSubmit(form: any) {
    this.submitted = true;
    if(this.newFileForm.valid) {
      this.proposals.saveProposals(form.value).subscribe(data => {
        this.router.navigateByUrl('/viewproposal');

        console.log("success ", data)
      });
    }

  }
}

