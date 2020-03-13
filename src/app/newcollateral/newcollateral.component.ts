import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NewCollateralService } from './newcollateral.service';
import { AppSharedService } from '../shared/services/shared.service';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { ViewCollateralService } from '../viewcollateral/viewcollateral.service';
import { CollateralListService } from '../collaterallist/collaterallist.service';

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
  providers: [NewCollateralService, ViewCollateralService,CollateralListService]
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
  collateralTags = [];
  allTagsList=[];
  
  @ViewChild('documentNameRef') documentNameRef: any;

  constructor(private router: Router,
    private acr: ActivatedRoute,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private toastr: ToastrService,
    private collateralService: NewCollateralService,
    private appSharedService: AppSharedService,
    private viewCollateralService: ViewCollateralService,
    private collateralListService:CollateralListService
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
      //search:[null]
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
   
      //this.collateralListService.getAllTags().subscribe((res:any)=> this.allTagsList=res);
      this.collateralListService.getAllTagNames().subscribe((res:any)=> this.allTagsList=res);
    
  

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
        if (data.errorType === 'DuplicateData') {
          this.spinnerService.spinner(false);
          setTimeout(() => {
            this.toastr.error(data.errorMessage, '', this.appSharedService.toastrOption);
          }, 100);
        }
        

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
  
  //tages = ["United States", "Canada", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and/or Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecudaor", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfork Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbarn and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virigan Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"];
  
 
  
   showDropdown = false;

  //code for autocomplete 
  
  toggleDropdown(){
    this.showDropdown = !this.showDropdown;
    console.log(this.allTagsList)
  }
  setValue(value:string){
     this.collateralForm.patchValue({"newTagInput":value});
     this.showDropdown=false;
  }
  getSearchValue(){
    return this.collateralForm.value.newTagInput;
  }
 
}
