import { Component, OnInit } from '@angular/core';
import { CollateralServices } from 'src/app/services/collateral.service';
import { TagServices } from 'src/app/services/tag.service';
import * as _ from 'lodash';

class TagsUIModel {
  tagId: number = null;
  tagsDescription: string;
  tagCount: number = null;
  bgColor: string;
}

@Component({
  selector: 'app-tag-option-panel',
  templateUrl: './tag-option-panel.component.html',
  styleUrls: ['./tag-option-panel.component.scss']
})
export class TagOptionPanelComponent implements OnInit {
  tags: TagsUIModel[] = [];
  texts: string[];
  results: string[];
  collateralId: number;
  constructor(private collateralService: CollateralServices, private tagservice: TagServices) { }
  ngOnInit() {
    this.collateralId = Number(localStorage.getItem('collateralId'))
    this.getAllTags();
  }
  // To get all tags saved against that file
  getAllTags() {
    this.tagservice.getAllTags(this.collateralId).subscribe((data: any) => {
      let tags: TagsUIModel[] = [];
      tags = _.map(data, (model) => {
        const tagsModel: TagsUIModel = _.omit(model, 'collateralId');
        if (!tagsModel.bgColor) { tagsModel.bgColor = '#444'; } 
        return tagsModel;
      });
      this.tags = tags;
    });
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
    this.collateralService.saveTagsAgainstCollateral(requestData).subscribe(data => {
      console.log("success to save tags ", data);
      this.getAllTags();
    }, (error) => {
      console.log('saveTagsAgainstCollateral error', error);
    });

  }


}
