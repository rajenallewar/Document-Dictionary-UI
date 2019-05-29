import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { NewCollateralService } from './newcollateral.service';
import { AppSharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-newcollateral',
  templateUrl: './newcollateral.component.html',
  styleUrls: ['./newcollateral.component.scss'],
  providers: [NewCollateralService]
})
export class NewcollateralComponent implements OnInit, OnDestroy {
  collateralForm: FormGroup;
  submitted = false;
  uploadedFiles: any = [];
  routeData: any;
  openType: string = '';
  collateralId: string = '';
  collateralObj: any;
  suggestedCollateralTypes = [];
  collateralTypes = [];

  constructor(private router: Router,
    private acr: ActivatedRoute,
    private formBuilder: FormBuilder,
    private collateralService: NewCollateralService,
    private appSharedService: AppSharedService) { }

  ngOnInit() {
    this.routeData = this.appSharedService.getRouteData();
    this.openType = this.routeData.openType;
    this.collateralId = this.routeData.index;
    this.collateralObj = this.routeData.collateralObj;
    this.collateralForm = this.formBuilder.group({
      collateralType: new FormControl("", Validators.required),
      documentName: new FormControl("", Validators.required),
      fileUpload: new FormControl(""),
    });


    // this.collateralTypes = [
    //   { id: "1", name: "Corporate Overview" },
    //   { id: "2", name: "Proposals & Presentation" },
    //   { id: "3", name: "Capabilities" },
    //   { id: "4", name: "Case Studies" },
    //   { id: "5", name: "Newsletters" },
    //   { id: "6", name: "White Papers" },
    //   { id: "7", name: "Brand Stories" }
    // ]

    this.collateralService.getAllCollateralTypes().subscribe((response: any)=>{
      this.collateralTypes = response;
    });

    if (this.collateralObj) {
      this.collateralForm.patchValue({
        collateralType: this.collateralObj.collateralType,
        documentName: this.collateralObj.docName,
      });
    }
  }
  get f() { return this.collateralForm.controls; }

  search(event) {
    this.suggestedCollateralTypes = this.collateralTypes.filter((c) => {
      let collateralType: string = c.collateralType ? c.collateralType.toString().toLowerCase() : '';
      let query: string = event.query.toLowerCase();
      return collateralType.startsWith(query)
    });
  }
  onSubmit(form: any) {
    this.submitted = true;
    console.log(form.value);

    this.checkFileError();
    if (this.collateralForm.valid) {
      
      this.collateralService.saveCollateral(this.collateralService.buildSaveRequest(form.value)).subscribe(data => {
        // this.router.navigateByUrl('/viewcollateral');
      });

    }
  }
  goBack() {
    this.router.navigate([{ outlets: { dialogs: null } }], { relativeTo: this.acr.parent });
  }
  removeSelectedFiles(e: Event, file: any) {
    console.log(file);
    let fileIndex = this.uploadedFiles.findIndex(p => p.name == file.name);
    if (fileIndex != -1) {
      this.uploadedFiles.splice(fileIndex, 1);
    }
  }
  fileEvent(fileInput: Event) {
    if (fileInput.target["files"]) {
      for (let index = 0; index < fileInput.target["files"].length; index++) {
        this.uploadedFiles.push(fileInput.target["files"][index])
      }
    }
    if (this.uploadedFiles && this.uploadedFiles.length) {
      this.collateralForm.get('fileUpload').setErrors(null);
    }
    
  }

  checkFileError() {
    if (!this.uploadedFiles || !this.uploadedFiles.length) {
      this.collateralForm.get('fileUpload').setErrors({'required': true});
    }
  }

  ngOnDestroy(){
    this.appSharedService.clearRouteData();
  }

}
