import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/shared/data-share.service';
import { CollateralServices } from 'src/app/services/collateral.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss']
})
export class AnnotationComponent implements OnInit {
   htmlCode:SafeHtml = '';
   collateralId: number;
  
  constructor(private dataShareService: DataShareService, private collaterealServices:CollateralServices, private domSan: DomSanitizer) { }
  ngOnInit() {
    this.collateralId = Number(localStorage.getItem('collateralId'))
     this.getConvertedHtmlFile(this.collateralId);
  }

public getConvertedHtmlFile(Id:number){
  this.collaterealServices.readHtmlConvertedFile(Id).subscribe((data)=> {
 
 this.htmlCode = this.domSan.bypassSecurityTrustHtml(data.toString());
   })

  
}

}