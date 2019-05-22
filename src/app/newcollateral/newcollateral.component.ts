import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-newcollateral',
  templateUrl: './newcollateral.component.html',
  styleUrls: ['./newcollateral.component.scss']
})
export class NewcollateralComponent implements OnInit {
  collateralForm:FormGroup;
  constructor(private router: Router, private acr:ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.collateralForm = this.formBuilder.group({
      collateralType: ['', Validators.required],
      documentName: ['', Validators.required]
    });
  }
  goBack(){
    this.router.navigate([{outlets:{dialogs:null}}], {relativeTo:this.acr.parent});
  }
}
