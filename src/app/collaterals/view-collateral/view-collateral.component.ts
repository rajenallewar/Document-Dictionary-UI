import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollateralServices } from 'src/app/services/collateral.service';
import { TagServices } from 'src/app/services/tag.service';
import { DataShareService } from 'src/app/shared/data-share.service';

@Component({
  selector: 'app-view-collateral',
  templateUrl: './view-collateral.component.html',
  styleUrls: ['./view-collateral.component.scss']
})
export class ViewCollateralComponent implements OnInit {
  collaterals:any;
  constructor(private route: Router, private collateralService: CollateralServices,private tagService:TagServices,private dataShareService: DataShareService) { }

  ngOnInit() {
    let tagName = localStorage.getItem('tagName');
    localStorage.removeItem('tagName');
        let proposalId = localStorage.getItem('proposalId');
        console.log("proposalId ",proposalId);
  
        console.log("tagName ", tagName)
        if (tagName) {
           this.searchByTags(tagName);
        } else {
         if (proposalId) {
            this.getCollateralByProposalId(Number(proposalId));
         } else {
           this.getAllCollaterals();
         }
      }
     localStorage.removeItem('proposalId');
   
   }
  getAllCollaterals(){
    this.collateralService.getCollaterals().subscribe((data) =>{
      
      this.collaterals = data;
      console.log("getAllCollaterals ",data);
      
    })
  }
  searchByTags(tag : string){
    this.tagService.searchByTags(tag).subscribe((data)=>{
      this.collaterals = data;
      console.log("searchByTags ",data);
    })
  }
  getCollateralByProposalId(id :number){
    this.collaterals = [];
    this.collateralService.getCollateralsByProposalId(id).subscribe((data)=>{
      this.collaterals = data;
      console.log("getCollateralByProposalId ",data);
    })
  }
   displayFile(Id: number) {
        localStorage.setItem('collateralId', Id.toString());
        this.route.navigateByUrl(`viewannotation/${Id}`);

    }
  }


