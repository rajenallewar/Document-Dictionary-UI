import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  collateralObj: any = {collateralTypeUIModel:'', docName:''};
  suggestedCollateralTypes = [];
  collateralTypes = [];
  proposalName:any;
  proposalId: any;

  constructor(private router: Router,
    private acr: ActivatedRoute,
    private formBuilder: FormBuilder,
    private collateralService: NewCollateralService,
    private appSharedService: AppSharedService) { }

  ngOnInit() {
    this.routeData = {...this.appSharedService.getRouteData()};
    this.openType = this.routeData.openType;
    if(this.openType == 'edit') {
      this.collateralId = this.routeData.index;
      this.collateralObj = this.routeData.collateralObj;
    } else if (this.openType == 'newFromPraposal') {
      this.proposalName = this.routeData.proposalName;
      this.proposalId = this.routeData.proposalId;
    }
    
    this.collateralForm = this.formBuilder.group({
      collateralTypeUIModel: new FormControl("", Validators.required),
      docName: new FormControl("", Validators.required),
      fileUpload: new FormControl(""),
    });

    this.collateralService.getAllCollateralTypes().subscribe((response: any)=>{
      this.collateralTypes = response;
    });
    if (this.collateralObj.fileName) {
      this.uploadedFiles=[];
      let file: any = {};
      file.name = this.collateralObj.fileName;
      this.uploadedFiles.push(file);
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
      this.collateralService.saveCollateral(this.collateralService.buildSaveRequest(this.collateralObj, this.openType, this.uploadedFiles, this.proposalId)).subscribe(data => {
        this.close();

        console.log('this.router :', this.router.url);
        if (this.router.url.indexOf('collaterals') != -1) {
          this.appSharedService.setNewCollateralCloseEvent(true);
        }else {
          setTimeout(() => {
            this.router.navigate(['/dms/collaterals']);
          }, 10);
        }
      });
    }
  }
  close() {
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
      this.uploadedFiles=[];
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
