import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CollateralServices } from 'src/app/services/collateral.service';


@Component({
  selector: 'app-new-collateral',
  templateUrl: './new-collateral.component.html',
  styleUrls: ['./new-collateral.component.scss']
})
export class NewCollateralComponent {
  submitted = false;
  constructor(private collateral:CollateralServices, private router: Router) { }

  newCollateralForm: FormGroup = new FormGroup({
    collateralType: new FormControl("", Validators.required),
    documentName: new FormControl("", Validators.required),
    annotated: new FormControl("", Validators.required),
   rating: new FormControl(2, Validators.required),
  
   
});

  get f() { return this.newCollateralForm.controls; }

  onSubmit(form: any) {
    this.submitted = true;
    this.collateral.saveCollateral(form.value).subscribe(data => {
         this.router.navigateByUrl('/viewcollateral');
         console.log("success ", data)
       
      });
  
  
  }
 
}
