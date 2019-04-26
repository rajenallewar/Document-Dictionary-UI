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
    // To fetch all collaterals
  getAllCollaterals(){
    this.collateralService.getCollaterals().subscribe((data) =>{
        this.collaterals = data;   
    })
  }
    // To fetch collaterals related to tags
  searchByTags(tag : string){
    this.tagService.searchByTags(tag).subscribe((data)=>{
      this.collaterals = data;
       })
  }
    // To fetch collateral linking with that proposal
  getCollateralByProposalId(id :number){
    this.collaterals = [];
    this.collateralService.getCollateralsByProposalId(id).subscribe((data)=>{
      this.collaterals = data;
      })
  }
  // To view collateral 
   displayFile(Id: number) {
        localStorage.setItem('collateralId', Id.toString());
        this.route.navigateByUrl(`viewannotation/${Id}`);

    }
  }


