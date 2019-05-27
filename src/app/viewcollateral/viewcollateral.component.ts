import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


class TagsUIModel {
  tagId: number = null;
  tagsDescription: string;
  tagCount: number = null;
  bgColor: string;
}

@Component({
  selector: 'app-viewcollateral',
  templateUrl: './viewcollateral.component.html',
  styleUrls: ['./viewcollateral.component.scss']
})
export class ViewcollateralComponent implements OnInit, OnDestroy {

tags: TagsUIModel[] = [];
texts: string[];
results: string[];
collateralId: number;
htmlCode: string = '';
constructor(private acr:ActivatedRoute,private router: Router) { }
ngOnInit() {
  this.collateralId = Number(localStorage.getItem('collateralId'))
  this.getAllTags();
  this.htmlCode = `
      <!DOCTYPE html>
  <html>
  <head>
  <title>Page Title</title>
  <style>
    .test {
      background-color:"red";
    }
  </style>
  </head>
  <body>
  
  <h1>My First Heading</h1>
  <p class="test">My first paragraph.</p>
  <p>The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. 
                              His beloved son Michael has just come home from the war, but does not intend to become part of his father's business. 
                              Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, 
                              kind and benevolent to those who give respect,
                              but given to ruthless violence whenever anything stands against the good of the family.</p>
                              <p>The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. 
                              His beloved son Michael has just come home from the war, but does not intend to become part of his father's business. 
                              Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, 
                              kind and benevolent to those who give respect,
                              but given to ruthless violence whenever anything stands against the good of the family.</p>
  
                              <p>The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. 
                              His beloved son Michael has just come home from the war, but does not intend to become part of his father's business. 
                              Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, 
                              kind and benevolent to those who give respect,
                              but given to ruthless violence whenever anything stands against the good of the family.</p>
  
  
  </body>
  </html>
      `;
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
  var color = Math.floor(0x1000000 * Math.random()).toString(16);
  return '#' + ('000000' + color).slice(-6);
}
// For saving all added tags
saveTags() {
  let requestData = {
    collateralId: Number(localStorage.getItem('collateralId')),
    listOfTags: this.tags
  };
  // this.collateralService.saveTagsAgainstCollateral(requestData).subscribe(data => {
  //   console.log("success to save tags ", data);
  //   this.getAllTags();
  // }, (error) => {
  //   console.log('saveTagsAgainstCollateral error', error);
  // });

}
goBack(){
  this.router.navigate([{outlets:{dialogs:null}}], {relativeTo:this.acr.parent});
}
ngOnDestroy() {
  
}

}
