import { Component, OnInit } from '@angular/core';
import { TagServices } from 'src/app/services/tag.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag-table',
  templateUrl: './tag-table.component.html',
  styleUrls: ['./tag-table.component.scss']
})
export class TagTableComponent implements OnInit {
  tags : any;
  constructor(private tagservice:TagServices,private router: Router) { }

  ngOnInit() {
    this.getTrendingTags();
  }
  getTrendingTags(){
    this.tagservice.getMostTrendingTags().subscribe((data) => {
    this.tags = data;
   
     })
  
  }
  getCollateralByTag(tag:string){
    localStorage.setItem('tagName',tag);
    console.log(tag);
    
    this.router.navigateByUrl('viewcollateral');

  }
}
