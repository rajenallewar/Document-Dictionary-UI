import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ViewFileComponent } from './view-file/view-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColumnFilterDataPipe } from './pipes/column.filterdata.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DocumentServices } from './services/document.service';
import { HttpClientModule } from '@angular/common/http';
import { LeftbarComponent } from './shared/components/left-bar/left-bar.component';
import { CollateralModule } from './collaterals/collateral.module';
import { ProposalModule } from './proposals/proposal.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProposalServices } from './services/proposal.service';
import { CollateralServices } from './services/collateral.service';
import { AnnotationModule } from './annotation/annotation.module';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ViewFileComponent,
    ColumnFilterDataPipe,
    LeftbarComponent,
    

  
  
    
    
   ],
  imports: [
    BrowserModule,
    
    AppRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    PdfViewerModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProposalModule,
    CollateralModule,
    DashboardModule,
    AnnotationModule,

 
    
   

   
   
  ],
  providers: [DocumentServices, ProposalServices, CollateralServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
