import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NewProposalService } from './newproposal.service';
import { AppSharedService } from '../shared/services/shared.service';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newproposal',
  templateUrl: './newproposal.component.html',
  styleUrls: ['./newproposal.component.scss'],
  providers: [NewProposalService]
})
export class NewproposalComponent implements OnInit {
  proposalForm: FormGroup;
  regionData: any;
  submitted = false;
  selectedregion: any;
  routeData: any;
  openType: string = '';
  startDate: Date;
  endDate: Date;
  proposalObj: any = { proposalName: null, clientName: null, startDate: null, endDate: null, requirement: null, region: null }


  constructor(private router: Router, private acr: ActivatedRoute, private formBuilder: FormBuilder,
    private spinnerService:SpinnerService, private toastr: ToastrService,
    private proposalService: NewProposalService, private appSharedService: AppSharedService) { }
    @HostListener('document:keyup.escape', ['$event']) onKeyupHandler(event: KeyboardEvent) {
      this.close();
  }


  ngOnInit() {
    this.routeData = { ...this.appSharedService.getRouteData() };
    this.openType = this.routeData.openType;

    this.proposalForm = this.formBuilder.group({
      proposalName: new FormControl("", Validators.required),
      clientName: new FormControl("", Validators.required),
      startDate: new FormControl("", Validators.required),
      endDate: new FormControl("", Validators.required),
      requirement: new FormControl("", Validators.required),
      region: new FormControl("", Validators.required)

    });
    this.getRegionData();

    if (this.openType == 'edit') {
      setTimeout(() => {
        this.proposalObj = { ...this.routeData.proposal };
        this.proposalObj.startDate = new Date(this.proposalObj.startDate);
        this.proposalObj.endDate = new Date(this.proposalObj.endDate);
      }, 300);

    }
  }
  get f() { return this.proposalForm.controls; }

  getRegionData() {
    this.regionData = [];
    this.proposalService.getRegionData().subscribe((data: any) => {
      if (data && data.length) {
        for (let i = 0; i < data.length; i++) {
          let item: any = {};
          item.label = data[i];
          item.value = data[i];
          this.regionData.push(item);
        }
      }
    })
  }
  onSubmit(form: any) {
    this.submitted = true;
    console.log(form.value);
    if (this.proposalForm.valid) {
      this.spinnerService.spinner(true);
      this.proposalService.saveProposal(this.proposalService.buildSaveRequest(this.openType, this.proposalObj)).subscribe(data => {
        this.close();
        
        if (this.router.url.indexOf('proposals') != -1) {
          this.appSharedService.setNewProposalCloseEvent(true);
        } else {
          setTimeout(() => {
            this.router.navigate(['/dms/proposals']);
          }, 10);
        }
        setTimeout(() => {
          this.toastr.success('Proposal Added', '', this.appSharedService.toastrOption);
        }, 100);
      },((err)=>{}),(()=>{this.spinnerService.spinner(false);}));
    }
  }
  close() {
    this.router.navigate([{ outlets: { dialogs: null } }], { relativeTo: this.acr.parent });
  }
  goBack() {
    this.router.navigate([{ outlets: { dialogs: null } }], { relativeTo: this.acr.parent });
  }
  ngOnDestroy() {
    this.appSharedService.clearRouteData();
  }
}
