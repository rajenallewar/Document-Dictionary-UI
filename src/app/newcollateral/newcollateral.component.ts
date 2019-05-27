import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NewCollateralService } from './newcollateral.service';

@Component({
  selector: 'app-newcollateral',
  templateUrl: './newcollateral.component.html',
  styleUrls: ['./newcollateral.component.scss'],
  providers: [NewCollateralService]
})
export class NewcollateralComponent implements OnInit {
  collateralForm:FormGroup;
  submitted = false;
  uploadedFiles: any = [];
  constructor(private router: Router, private acr:ActivatedRoute, 
    private formBuilder: FormBuilder,private collateralService:NewCollateralService) { }
  
   ngOnInit() {
    this.collateralForm = this.formBuilder.group({
      collateralType: new FormControl("", Validators.required),
      documentName: new FormControl("", Validators.required),
      fileUpload: new FormControl("", Validators.required),
      });
  }
    get f() { return this.collateralForm.controls; }
    
    onSubmit(form: any) {
      this.submitted = true;
      console.log(form.value);
     
      if(this. collateralForm.valid) {
        this.collateralService.saveCollateral(form.value).subscribe(data => {
          // this.router.navigateByUrl('/viewcollateral');
         });
   
      }
       }
  goBack(){
    this.router.navigate([{outlets:{dialogs:null}}], {relativeTo:this.acr.parent});
  }
  removeSelectedFiles(e: Event, file: any) {
    console.log(file);
    let fileIndex = this.uploadedFiles.findIndex(p=>p.name == file.name);
    if (fileIndex != -1) {
      this.uploadedFiles.splice(fileIndex, 1);
    }
  }
   fileEvent(fileInput: Event){
    if (fileInput.target["files"]){
      for(let index = 0; index < fileInput.target["files"].length; index++) {
        this.uploadedFiles.push(fileInput.target["files"][index])
      }
    }
  }
}
