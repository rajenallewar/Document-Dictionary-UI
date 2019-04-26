import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TagOptionPanelComponent } from './tag-option-panel/tag-option-panel.component';
import { AnnotationComponent } from './annotation/annotation.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
@NgModule({
  declarations: [
    AnnotationComponent,
    TagOptionPanelComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AutoCompleteModule
  
  ]
})
export class AnnotationModule { }
