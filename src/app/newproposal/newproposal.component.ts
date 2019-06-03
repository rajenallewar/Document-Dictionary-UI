import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NewProposalService } from './newproposal.service';
import { AppSharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-newproposal',
  templateUrl: './newproposal.component.html',
  styleUrls: ['./newproposal.component.scss'],
  providers: [NewProposalService]
})
export class NewproposalComponent implements OnInit {
  proposalForm:FormGroup;
  regionData:any;
  submitted = false;
  selectedregion:any;
  routeData: any;
  openType: string = '';
  proposalId: string = '';
  startDate:Date;
  endDate:Date;
  proposalObj: any = {  proposalName :'', clientName:'',startDate:'',endDate:'',requirement:'',region:''}
  
 
  constructor(private router: Router, private acr:ActivatedRoute, private formBuilder: FormBuilder,
     private proposalService: NewProposalService, private appSharedService: AppSharedService) { }

  ngOnInit() {
    this.routeData = {...this.appSharedService.getRouteData()};
    this.openType = this.routeData.openType;
    if(this.openType == 'edit') {
      this.proposalId = this.routeData.index;
      this.proposalObj = this.routeData.proposalObj;
    }
    this.proposalForm = this.formBuilder.group({
      proposalName: new FormControl("", Validators.required),
      clientName: new FormControl("", Validators.required),
      startDate: new FormControl("", Validators.required),
      endDate: new FormControl("", Validators.required),
      requirement: new FormControl("", Validators.required),
      region: new FormControl("", Validators.required)
      
    });
    this.getRegionData();
  }
  get f() { return this.proposalForm.controls; }

  getRegionData(){
    this.regionData = [];
    this.proposalService.getRegionData().subscribe((data:any)=>{
      if(data && data.length) {
        for (let i = 0; i < data.length; i++) {
          let item: any = {};
          item.label = data[i] ;
          item.value = i;
          this.regionData.push(item);
        }
      }
    })
  }
  onSubmit(form: any) {
    this.submitted = true;
    console.log(form.value);
    if (this.proposalForm.valid) {      
      this.proposalService.saveProposal(this.proposalService.buildSaveRequest(this.proposalId, this.openType)).subscribe(data => {
        this.close();

        console.log('this.router :', this.router.url);
        if (this.router.url.indexOf('proposals') != -1) {
          this.appSharedService.setNewCollateralCloseEvent(true);
        }else {
          setTimeout(() => {
            this.router.navigate(['/dms/proposals']);
          }, 10);
        }
      });
    }
  }
  close() {
    this.router.navigate([{ outlets: { dialogs: null } }], { relativeTo: this.acr.parent });
  }
  goBack(){
    this.router.navigate([{outlets:{dialogs:null}}], {relativeTo:this.acr.parent});
  }
  ngOnDestroy(){
    this.appSharedService.clearRouteData();
  }
}
