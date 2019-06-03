import { Component, OnInit } from '@angular/core';
import { SmeService } from './smelist.service';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-smelist',
  templateUrl: './smelist.component.html',
  styleUrls: ['./smelist.component.scss'],
  providers: [SmeService]
})
export class SmelistComponent implements OnInit {
  smeList: any;
  data: any;
  options: any;
  doughtnutData: any = {};
  selectedUser: any = {};
  BUSme: any;
  smeArchData: any;
  keyword:string;
  totalRecords= 100;
  constructor(private smelistservice: SmeService) {

  }

  ngOnInit() {
    this.doughtnutData = {
      "data": [],
      "labels": [],
      "bgColors": []
    }
    this.getTotalSmeCount();
  }

  getSMEList() {
    let req = {
      "offset":1,
      "limit":10
    }
    this.smelistservice.getSmeList(req).subscribe((data) => {
      this.smeList = data;
    })
  }
  loadSmeListLazy(event){
    console.log("loadSmeListLazy :", event);   
    let req = {
      "offset":event.first+1,
      "limit":event.rows
    }
    this.smelistservice.getSmeList(req).subscribe((data: any) => {
      this.smeList = data;
      console.log("this.smeList ", this.smeList);
      
      // this.smeList = data.slice(event.first, (event.first + event.rows));
    })
  }
  onSmeNameClickHandler(event: Event, smeInfo: any, region: string, overlaypanel: OverlayPanel) {
    event.preventDefault();
    this.selectedUser = smeInfo;
    this.selectedUser["region"] = region;
    overlaypanel.toggle(event);
  }
  searchDomain(event){
    let keyword= this.keyword;
    if(keyword != "") {
      this.smelistservice.getDomainByUserkeyword(keyword).subscribe((data)=>{
        this.smeList=data;
      })
    } else  {
      this.loadSmeListLazy({first: 0, rows: 10});
    }
 
     
   }
  getTotalSmeCount() {
    this.smelistservice.getTotalSmeCount().subscribe((data: any) => {

      this.smeArchData = data;
      for (const key in this.smeArchData.mapOfBuVsCount) {
        if (this.smeArchData.mapOfBuVsCount.hasOwnProperty(key)) {
          this.doughtnutData.data.push(this.smeArchData.mapOfBuVsCount[key]);
          this.doughtnutData.labels.push(key);
          switch (key) {
            case "UAE":
              this.doughtnutData.bgColors.push("#FFC733");
              break;
            case "Charlotte":
              this.doughtnutData.bgColors.push("#f17f7b");
              break;
            case "USCentral":
              this.doughtnutData.bgColors.push("#67e7f1");
              break;
            case "New York":
              this.doughtnutData.bgColors.push("#71ecb3");
              break;
            case "Paris":
              this.doughtnutData.bgColors.push("#ebcd84");
              break;
            case "Singapore":
              this.doughtnutData.bgColors.push("#d478bc");
              break;
            case "UK":
              this.doughtnutData.bgColors.push("#5ce35b");
              break;
            case "Amsterdam":
              this.doughtnutData.bgColors.push("#e15079");
              break;
            default:
              break;
          }
        }
      }
      this.data = {
        labels: this.doughtnutData.labels,
        datasets: [
          {
            data: this.doughtnutData.data,
            backgroundColor: this.doughtnutData.bgColors
          }]
      };
      this.options = {
        legend: {
          display: false
        },
        cutoutPercentage: 90,
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        layout: {
          padding: {
            left: 15,
            right: 15,
            top: 15,
            bottom: 15
          }
        }
      }
    });

  }
}

