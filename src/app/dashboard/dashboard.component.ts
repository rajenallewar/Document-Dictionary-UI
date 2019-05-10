import { Component, OnInit } from '@angular/core';
import { ProposalServices } from '../services/proposal.service';
import { DatePipe } from '@angular/common';
import { DataShareService } from '../shared/data-share.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Proposals:any;
  doughtnutData: any = {};
  user:any={};
  barChartData: any = {};
  proposalCardsData :any = [];
  proposalCardsTotalCountData :any = [];
  proposalValueData: any = [];
  totalProposals: number = 0;
  dateRange:any;

  constructor(private proposalservice:ProposalServices, public datePipe: DatePipe, private dataShareService:DataShareService)  {
 }

ngOnInit() {
  if (!this.dataShareService.startDate || !this.dataShareService.endDate) {
    this.getDefaultDates();
  } else {
    this.dateRange=[new Date(this.dataShareService.startDate), new Date(this.dataShareService.endDate)];
  }
  
  this.getSummaryOfProposal(this.dataShareService.startDate,this.dataShareService.endDate);
  let user = {
    firstName :  "John",
    lastName : "Roy"
  }
  localStorage.setItem("user", JSON.stringify(user));

  this.user=JSON.parse(localStorage.getItem("user"))
}

getDefaultDates() {
  let currentDate = new Date();
  
  //Set end date as of yesterday
  currentDate.setDate(currentDate.getDate() - 1);
  this.dataShareService.endDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');

  //Set start date as 1 month before
  currentDate.setMonth(currentDate.getMonth() - 1);
  this.dataShareService.startDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
  this.dateRange=[new Date(this.dataShareService.startDate), new Date(this.dataShareService.endDate)];
  console.log("this.dateRange ", this.dateRange);
  
}

onDateSelect(event){
  if (this.dateRange && this.dateRange[0] && this.dateRange[1]) {
    this.getSummaryOfProposal(this.dateRange[0], this.dateRange[1]);
    this.dataShareService.startDate = this.datePipe.transform(this.dateRange[0], 'yyyy-MM-dd') ;
    this.dataShareService.endDate = this.datePipe.transform(this.dateRange[1], 'yyyy-MM-dd') ;
  }
}


getSummaryOfProposal(startDate: any, endDate: any){
  let requestParams = {
    "startDate": this.datePipe.transform(startDate, 'yyyy-MM-dd'),
    "endDate": this.datePipe.transform(endDate, 'yyyy-MM-dd')
  }
  // To pass data to  doughtnut chart 
  this.proposalservice.getSummaryofProposalsByStatus(requestParams).subscribe((data) => { 
    console.log("data ",data)
    this.doughtnutData = {
      "data": [],
      "label": [],
      "bgColor":[]
    }
      this.proposalValueData=data;
      this.proposalCardsData = data;
      data.forEach((proposal) => {
        this.doughtnutData.data.push(proposal["countOfProposals"])
        this.doughtnutData.label.push(proposal["status"])
        switch (proposal["status"]) {
          case "In-Progress":
          this.doughtnutData.bgColor.push("#FFC733");
            break;
          case "Lost":
          this.doughtnutData.bgColor.push("#FF0000");
            break;
          case "New":
          this.doughtnutData.bgColor.push("#00FF00");
            break;
          case "Review":
          this.doughtnutData.bgColor.push("#FF00FF");
            break;
          case "Won":
          this.doughtnutData.bgColor.push("#0000FF");
            break;        
          default:
            break;
        }  
      });
   })

   // To pass data to bar chart
   this.proposalservice.getSummaryofProposalsByAccount(requestParams).subscribe((data)=>{
    this.barChartData["dataInProgrss"] = [];
    this.barChartData["dataTotal"] = [];
    this.barChartData["dataWon"] = [];
    this.barChartData["dataLost"] = [];
    this.barChartData["labels"] = [];
     data.forEach((proposal)=>{
       this.barChartData.dataInProgrss.push(proposal["countInprogress"])
       this.barChartData.dataTotal.push(proposal["countOfProposals"])
       this.barChartData.dataWon.push(proposal["countWon"])
       this.barChartData.dataLost.push(proposal["countLost"])
       this.barChartData.labels.push(proposal["clientName"])
     })  
     this.totalProposals = data.length;
     })

     this.proposalservice.getProposalCountByDate(requestParams).subscribe((data)=>{
       this.proposalCardsTotalCountData=data;
     })
}

}