import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ViewProposalComponent } from './view-proposal/view-proposal.component';
import { NewProposalComponent } from './new-proposal/new-proposal.component';
import { ProposalServices } from '../services/proposal.service';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    declarations: [
        ViewProposalComponent,
        NewProposalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
       ],
    providers: [],
    bootstrap: []
  })
  export class ProposalModule { }