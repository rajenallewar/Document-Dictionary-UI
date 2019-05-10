import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewCollateralComponent } from './new-collateral/new-collateral.component';
import { ViewCollateralComponent } from './view-collateral/view-collateral.component';
import {FileUploadModule} from 'primeng/fileupload';
import { TableModule } from 'primeng/table';

@NgModule({
    declarations: [
        NewCollateralComponent,
        ViewCollateralComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule,
        TableModule,
       ],
    providers: [],
    bootstrap: []
  })
  export class CollateralModule { }