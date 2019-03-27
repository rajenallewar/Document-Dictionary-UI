import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-collateral',
  templateUrl: './new-collateral.component.html',
  styleUrls: ['./new-collateral.component.scss']
})
export class NewCollateralComponent {

  constructor() { }

  newCollateralForm: FormGroup = new FormGroup({
    collateralType: new FormControl("", Validators.required),
    documentName: new FormControl("", Validators.required),
    annotated: new FormControl("", Validators.required),
   // rating: new FormControl("", Validators.required),
  
   
});

  get f() { return this.newCollateralForm.controls; }

  onSubmit(form: any) {
  
  }

}
