import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CollateralServices } from 'src/app/services/collateral.service';
import { ProposalServices } from 'src/app/services/proposal.service';


@Component({
  selector: 'app-new-collateral',
  templateUrl: './new-collateral.component.html',
  styleUrls: ['./new-collateral.component.scss']
})
export class NewCollateralComponent implements OnInit {
  ngOnInit(): void {
    this.getAllProposals();
  }
  submitted = false;
  uploadedFiles: any[] = [];
  Proposals:any;

  constructor(private collateral:CollateralServices, private router: Router,private proposalService:ProposalServices) { }

    newCollateralForm: FormGroup = new FormGroup({
    collateralType: new FormControl("", Validators.required),
    docName: new FormControl("", Validators.required),
    annotated: new FormControl("", Validators.required),
    proposalId: new FormControl("", Validators.required)
   
  });

  get f() { return this.newCollateralForm.controls; }
  
  onSubmit(form: any) {
    this.submitted = true;
    console.log(form.value);
   
    if(this. newCollateralForm.valid) {
      this.collateral.saveCollateral(form.value).subscribe(data => {
        this.router.navigateByUrl('/viewcollateral');
      
      
     });
 
    }
    
  
  }
  // onUpload(event) {
  //   for(let file of event.files) {
  //       this.uploadedFiles.push(file);
  //   }

    // this.CollateralServices.add({severity: 'info', summary: 'File Uploaded', detail: ''});

getAllProposals(){
  this.proposalService.getAllProposals().subscribe((data) => {
    this.Proposals = data;
    console.log(data);
      })
}
 
}
