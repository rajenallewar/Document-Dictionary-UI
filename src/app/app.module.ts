import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewFileComponent } from './view-file/view-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { ColumnFilterDataPipe } from './pipes/column.filterdata.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DocumentServices } from './services/document.services';
import { HttpClientModule } from '@angular/common/http';
import { LeftbarComponent } from './shared/components/left-bar/left-bar.component';
import {  ProposalModule } from './praposal/proposal.module';
import { CollateralModule } from './collaterals/collateral.module';
import {TooltipModule} from 'ng2-tooltip-directive';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ViewFileComponent,
    ColumnFilterDataPipe,
    LeftbarComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    TagCloudModule,
    PdfViewerModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProposalModule,
    CollateralModule,
    TooltipModule
   
  ],
  providers: [DocumentServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
