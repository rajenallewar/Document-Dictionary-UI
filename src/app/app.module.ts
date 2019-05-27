import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppSharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProposallistComponent } from './proposallist/proposallist.component';
import { CollaterallistComponent } from './collaterallist/collaterallist.component';
import { NewproposalComponent } from './newproposal/newproposal.component';
import { NewcollateralComponent } from './newcollateral/newcollateral.component';
import { RfpContainerComponent } from './rfp-container/rfp-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import { SmelistComponent } from './smelist/smelist.component';
import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from './shared/utils/customUrlSerializer';
import {TableModule} from 'primeng/table';
import {ChartModule} from 'primeng/chart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {PaginatorModule} from 'primeng/paginator';
import { CollateralCardComponent } from './collaterallist/collateral-card/collateral-card.component';
import { ViewcollateralComponent } from './viewcollateral/viewcollateral.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    ProposallistComponent,
    CollaterallistComponent,
    NewproposalComponent,
    NewcollateralComponent,
    RfpContainerComponent,
    SmelistComponent,
    CollateralCardComponent,
    ViewcollateralComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppSharedModule.forRoot(),
    AppRoutingModule,
    NgbModule,
    TableModule,
    ReactiveFormsModule,
    DialogModule,
    ChartModule,
    OverlayPanelModule,
    AngularFontAwesomeModule,
        PaginatorModule
    
  ],
  providers: [
    { provide: UrlSerializer, useClass: CustomUrlSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
