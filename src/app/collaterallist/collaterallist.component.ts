import { Component, OnInit } from '@angular/core';
import { CollateralListService } from './collaterallist.service';

@Component({
  selector: 'app-collaterallist',
  templateUrl: './collaterallist.component.html',
  styleUrls: ['./collaterallist.component.scss'],
  providers: [CollateralListService]
})
export class CollaterallistComponent implements OnInit {
  public data: any;
  public options: any;
  public collateralData:any ={};
  public collateralList:any =[];
  displayLineChart:boolean = false;
  
  constructor(private collateralListService:CollateralListService) { }

  ngOnInit() {
    this.data = {
      labels: [],
      datasets: []
    };

    this.options = {
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      scales: {
        xAxes: [{
          display: false,
          stacked: true
        }],
        yAxes: [{
          stacked: true,
          display: false,
          barPercentage: 0.5,
          barThickness: 3,
          maxBarThickness: 3,
          minBarLength: 3
        }]
      }
    };
    this.getCollateralList();
    this.getCollateralsCount();

    
  }
  getCollateralsCount() {
    this.collateralListService.collateralTypeCount().subscribe((response:any)=>{      
      if (response) {
        // this.collateralData = response;
        this.collateralData.totalCount = response.totalCount;
        if (response.mapOfCollaterlCountUIModel) {
          this.collateralData.collateralCounts =[];
          for (const key in response.mapOfCollaterlCountUIModel) {
            if (response.mapOfCollaterlCountUIModel.hasOwnProperty(key)) {
              let item:any = {};
              item.label = key;
              let totalCount = +response.totalCount;
              let count = +response.mapOfCollaterlCountUIModel[key];
              let perCount = 100*count/totalCount;
              item.data = [perCount];
              item.count = +response.mapOfCollaterlCountUIModel[key];


              switch (key) {
                case "Brand Stories":
                  item.backgroundColor = "#FF8533";
                  break;
                case "Capabilities":
                  item.backgroundColor = "#9562fb";
                  break;
                case "Case Studies":
                  item.backgroundColor = "#7bc5f1";
                  break;
                case "Corporate Overview":
                  item.backgroundColor = "#7bf19b";
                  break;
                case "Newsletters":
                  item.backgroundColor = "#cafb62";
                  break;
                case "Proposals & Presentation":
                  item.backgroundColor = "#f1a87b";
                  break;
                case "White Papers":
                  item.backgroundColor = "#fb6262";
                  break;
                default:
                  break;
              }
              this.data.datasets.push(item);
              this.collateralData.collateralCounts.push(item);
            }
          }
          
          this.data.datasets = this.data.datasets.slice();
        }
      }
      console.log(this.data);
      this.displayLineChart = true;
    });
  }
  getCollateralList() {
    let req = {
      "limit":1,
      "offset":10
    }
    this.collateralListService.getCollaterals(req).subscribe((response)=>{
      console.log(response);
      this.collateralList = response;
    });
  }
  paginate(e) {

  }

}
