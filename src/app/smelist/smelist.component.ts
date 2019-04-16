import { Component, OnInit } from '@angular/core';
import { SMEListServices } from '../services/smelist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-smelist',
  templateUrl: './smelist.component.html',
  styleUrls: ['./smelist.component.scss']
})
export class SmelistComponent implements OnInit {
  SmeList:any;
  constructor(private route: Router,
    private smelistservice:SMEListServices) { }

  ngOnInit() {
    this.getSMEList();
  }
  getSMEList(){
    this.smelistservice.getSMEList().subscribe((data)=>
    {
      this.SmeList=data;
    })
  }
}
