import { Component, OnInit } from '@angular/core';
import { DocumentServices } from '../services/document.services';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.scss']
})
export class NewFileComponent {

  form_modal: HTMLElement = document.getElementById('uploadModal');
  constructor(private _docServices: DocumentServices) { }

  newFileForm: FormGroup = new FormGroup({
    clientName: new FormControl("", Validators.required),
    docName: new FormControl("", Validators.required),
    startDate: new FormControl("", Validators.required),
    endDate: new FormControl("", Validators.required),
    requirement: new FormControl("", Validators.required),
    region: new FormControl("", Validators.required),
    status: new FormControl("", Validators.required),
    keyWord: new FormControl("", Validators.required),
    uplodaedUser: new FormControl("", Validators.required),
    uplodaedData: new FormControl("", Validators.required),
    idField: new FormControl("", Validators.required),
});

  get f() { return this.newFileForm.controls; }

  onSubmit(form: any) {
  this._docServices.saveDocument(form.value).subscribe(data => {
    }, (err) => {
    });
  }
}





