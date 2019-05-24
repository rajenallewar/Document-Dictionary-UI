import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-collateral-card',
  templateUrl: './collateral-card.component.html',
  styleUrls: ['./collateral-card.component.scss']
})
export class CollateralCardComponent implements OnInit {
    @Input('card') card: any = null;
    constructor() {}

    ngOnInit() {
    }
}
