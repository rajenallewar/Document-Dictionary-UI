import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ViewProposalComponent } from './view-proposal/view-proposal.component';
import { NewProposalComponent } from './new-proposal/new-proposal.component';
import {TableModule} from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    declarations: [
        ViewProposalComponent,
        NewProposalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        CalendarModule
        
       ],
    providers: [],
    bootstrap: []
  })
  export class ProposalModule { }