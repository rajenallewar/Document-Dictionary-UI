import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NewCollateralService } from './newcollateral.service';
import { AppSharedService } from '../shared/services/shared.service';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { ViewCollateralService } from '../viewcollateral/viewcollateral.service';


class TagsUIModel {
  tagId: number = null;
  tagName: string;
  tagCount: number = null;
  tagColor: string;
}
@Component({
  selector: 'app-newcollateral',
  templateUrl: './newcollateral.component.html',
  styleUrls: ['./newcollateral.component.scss'],
  providers: [NewCollateralService, ViewCollateralService]
})

export class NewcollateralComponent implements OnInit, OnDestroy, AfterViewInit {
  tags: TagsUIModel[] = [];  
  tagColor: any;
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
  showTagError = false;
  newTag: string = '';


  @ViewChild('documentNameRef') documentNameRef: any;

  constructor(private router: Router,
    private acr: ActivatedRoute,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private toastr: ToastrService,
    private collateralService: NewCollateralService,
    private appSharedService: AppSharedService,
    private viewCollateralService: ViewCollateralService
    ) { }


    @HostListener('document:keyup.escape', ['$event']) onKeyupHandler(event: KeyboardEvent) {
      this.close();
  }

  ngOnInit() {
    this.routeData = {...this.appSharedService.getRouteData()};
    this.openType = this.routeData.openType;
    if(this.openType == 'edit') {
      this.collateralId = this.routeData.index;
      this.collateralObj = {...this.routeData.collateralObj};
    } else if (this.openType == 'newFromPraposal') {
      this.proposalName = this.routeData.proposalName;
      this.proposalId = this.routeData.proposalId;
    }
    
    this.collateralForm = this.formBuilder.group({
      collateralTypeUIModel: new FormControl("", Validators.required),
      docName: new FormControl("", Validators.required),
      spoc: new FormControl(""),
      fileUpload: new FormControl(""),
      newTagInput: new FormControl(""),
    });

    this.collateralService.getAllCollateralTypes().subscribe((response: any)=>{
      this.collateralTypes = response;
    });
    if (this.collateralObj.fileName) {
      this.uploadedFiles=[];
      let fileItem: any = {};
      fileItem.fileName = this.collateralObj.fileName;
      fileItem.file = null;
      this.uploadedFiles.push(fileItem);
    }


  }
  ngAfterViewInit(){
    setTimeout(() => {
      if( this.documentNameRef &&  this.documentNameRef.nativeElement){
          this.documentNameRef.nativeElement.focus();
        }
    }, 100);
  }
  get f() { return this.collateralForm.controls; }

  search(event) {
    this.suggestedCollateralTypes = this.collateralTypes.filter((c) => {
      let collateralType: string = c.collateralType ? c.collateralType.toString().toLowerCase() : '';
      let query: string = event.query.toLowerCase();
      return collateralType.startsWith(query)
    });
  }
  addAnnotation(newAnnotation: string) {
    if (newAnnotation) {
      let tagIndex = this.tags.findIndex(t => t.tagName.toLowerCase() == newAnnotation.toLowerCase());
      if (tagIndex !== null && tagIndex !== undefined && tagIndex >= 0) {
        console.log("this tag is already exist.");
        this.showTagError = true;
      } else {
        this.newTag = '';
        const tagsModel = new TagsUIModel();
        tagsModel.tagName = newAnnotation;
        tagsModel.tagColor = this.getRandomColor();
        this.tags.push(tagsModel);
      }
    }
  }

  onDeleteTag(tag) {
    const tagIndex = this.tags.findIndex(t => t.tagName == tag.tagName);
    if (tagIndex !== null && tagIndex !== undefined && tagIndex >= 0) {
      this.tags.splice(tagIndex, 1);
    }
  }

  
  displayAllTags(data) {
    let tags: TagsUIModel[] = [];
    tags = _.map(data, (model) => {
      const tagsModel: TagsUIModel = _.omit(model, 'collateralId');
      if (tagsModel.tagColor) {
        tagsModel.tagColor = tagsModel.tagColor;
      } else {
        tagsModel.tagColor = '#f8e52d';
      }
      console.log("tagsModel after save call ", tagsModel);

      return tagsModel;
    });
    this.tags = tags;
  }

  // To give random color to each tag
  getRandomColor() {
    var color = (function lol(m, s, c) {
      return s[m.floor(m.random() * s.length)] +
        (c && lol(m, s, c - 1));
    })(Math, '6789ABCDEF', 4);
    return '#' + color;
  }
  onSubmit(form: any) {
    this.submitted = true;
    console.log(form.value);

    this.checkFileError();
    if (this.collateralForm.valid && this.tags.length > 0) {
      this.spinnerService.spinner(true);
      this.collateralService.saveCollateral(this.collateralService.buildSaveRequest(this.collateralObj, this.openType, this.uploadedFiles, this.proposalId)).subscribe(data => {
        console.log(data);
        if (data.collateralId) {
          const requestData = {
            collateralId: data.collateralId,
            listOfTags: this.tags
          };
          this.viewCollateralService.saveTag(requestData).subscribe((data2: any) => {
            if (data2) {
              this.close();
              if (this.router.url.indexOf('collaterals') != -1) {
                this.appSharedService.setNewCollateralCloseEvent(true);
              } else {
                setTimeout(() => {
                  this.router.navigate(['/dms/collaterals']);
                }, 10);
              }
              setTimeout(() => {
                this.toastr.success('Collateral Added', '', this.appSharedService.toastrOption);
              }, 100);
            }
          }, ((err) => { }), (() => { this.spinnerService.spinner(false); }));

        }
        this.spinnerService.spinner(false);

      }, ((err) => { }), (() => { this.spinnerService.spinner(false); }));
    }
  }
  close() {
    this.router.navigate([{ outlets: { dialogs: null } }], { relativeTo: this.acr.parent });
  }
  removeSelectedFiles(e: Event, file: any) {
    let fileIndex = this.uploadedFiles.findIndex(p => p.fileName == file.fileName);
    if (fileIndex != -1) {
      this.uploadedFiles.splice(fileIndex, 1);
    }
  }
  fileEvent(fileInput: Event) {
    if (fileInput.target["files"]) {
      this.uploadedFiles=[];
      for (let index = 0; index < fileInput.target["files"].length; index++) {
        let fileItem: any = {};
        fileItem.fileName = fileInput.target["files"][index].name;
        fileItem.file = fileInput.target["files"][index];
        this.uploadedFiles.push(fileItem);
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
