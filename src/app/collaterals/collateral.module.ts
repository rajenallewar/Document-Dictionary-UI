import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewCollateralComponent } from './new-collateral/new-collateral.component';
import { ViewCollateralComponent } from './view-collateral/view-collateral.component';
// import {StarRatingModule} from 'angular-star-rating';
// import {RatingModule} from 'primeng/rating';

import {FileUploadModule} from 'primeng/fileupload';


@NgModule({
    declarations: [
        NewCollateralComponent,
        ViewCollateralComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule
        // RatingModule,
        // StarRatingModule.forRoot()
       ],
    providers: [],
    bootstrap: []
  })
  export class CollateralModule { }