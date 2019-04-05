import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartBarComponent } from './chart-bar/chart-bar.component';
import { ChartDoughnutComponent } from './chart-doughnut/chart-doughnut.component';
import { ChartModule } from 'primeng/chart';
import { DashboardComponent } from './dashboard.component';
import { ProposalCardComponent } from './proposal-card/proposal-card.component';
import { ProposalValueTableComponent } from './proposal-value-table/proposal-value-table.component';
import { TagTableComponent } from './tag-table/tag-table.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ChartDoughnutComponent,
        ChartBarComponent,
        ProposalCardComponent,
        ProposalValueTableComponent,
        TagTableComponent,
       
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ChartModule
      
    ],
    providers: [],
    bootstrap: []
  })
  export class DashboardModule { }