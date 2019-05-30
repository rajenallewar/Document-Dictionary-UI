import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppSharedService } from '../shared/services/shared.service';
import { ViewCollateralService } from './viewcollateral.service';
import { downloadFile } from '../shared/utils/app.utils';

class TagsUIModel {
  tagId: number = null;
  tagsDescription: string;
  tagCount: number = null;
  bgColor: string;
}

@Component({
  selector: 'app-viewcollateral',
  templateUrl: './viewcollateral.component.html',
  styleUrls: ['./viewcollateral.component.scss'],
  providers: [ViewCollateralService]
})
export class ViewcollateralComponent implements OnInit, OnDestroy {

tags: TagsUIModel[] = [];
texts: string[];
results: string[];
collateralId: number;
routeData:any;
htmlCode:SafeHtml = '';
file:any;
fileName: string = "";
fileUrl;

constructor(private acr:ActivatedRoute,
  private router: Router,
  private domSan: DomSanitizer,
  private viewCollateralService:ViewCollateralService,
  private appSharedService: AppSharedService) { }
ngOnInit() {
  this.routeData = this.appSharedService.getRouteData();
  this.collateralId = this.routeData.collateralObj.collateralId;
  this.fileName = this.routeData.collateralObj.fileName;
  this.getConvertedHtmlFile(this.collateralId);
  this.getAllTags();
 
}
// To get all tags saved against that file
getAllTags() {
  // this.tagservice.getAllTags(this.collateralId).subscribe((data: any) => {
  //   let tags: TagsUIModel[] = [];
  //   tags = _.map(data, (model) => {
  //     const tagsModel: TagsUIModel = _.omit(model, 'collateralId');
  //     if (!tagsModel.bgColor) { tagsModel.bgColor = '#444'; } 
  //     return tagsModel;
  //   });
  //   this.tags = tags;
  // });
}
//  To add tags related with that file
addAnnotation(newAnnotation: string) {
  if (newAnnotation) {
    const tagsModel = new TagsUIModel();
    tagsModel.tagsDescription = newAnnotation;
    tagsModel.bgColor = this.getRandomColor();
   this.tags.push(tagsModel);
  }
}
// To give random color to each tag
getRandomColor() {
  var color = (function lol(m, s, c) {
    return s[m.floor(m.random() * s.length)] +
        (c && lol(m, s, c - 1));
})(Math, '6789ABCDEF', 4);
return '#' + color;
 }
// For saving all added tags
saveTags() {
  let requestData = {
    collateralId: this.collateralId,
    listOfTags: this.tags
  };
  this.viewCollateralService.saveTag(requestData).subscribe(data => {
    console.log("success to save tags ", data);
  }, (error) => {
    console.log('saveTags error', error);
  });

}
goBack(){
  this.router.navigate([{outlets:{dialogs:null}}], {relativeTo:this.acr.parent});
}
public getConvertedHtmlFile(id:number){
  this.viewCollateralService.readHtmlConvertedFile(id).subscribe((data: any)=> {
  this.htmlCode = this.domSan.bypassSecurityTrustHtml(data.docContent.toString());
   })

  
}
downloadCollateral(){
  let downloadObj = {
    "fileName":this.fileName,
  }
  this.viewCollateralService.downloadFile(downloadObj).subscribe((data:any)=>{

    downloadFile(data, this.fileName, 'application/octet-stream');
    
    // const url = window.URL.createObjectURL(data);
  
    // const link = this.downloadZipLink.nativeElement;
    // link.href = url;
    // link.download = 'archive.zip';
    // link.click();
  
    // window.URL.revokeObjectURL(url);

    // console.log(data);
    // const blob = new Blob([data], { type: 'application/octet-stream' });

    // this.fileUrl = this.domSan.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    
  })
}
ngOnDestroy(){
  this.appSharedService.clearRouteData();
}

}
