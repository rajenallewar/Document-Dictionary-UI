import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-smelist',
  templateUrl: './smelist.component.html',
  styleUrls: ['./smelist.component.scss']
})
export class SmelistComponent implements OnInit {
  SmeList: any;
  data: any;
  options: any;
  totalCount = "2241";
  constructor() {
    this.data = {
      labels: ['Charlotte BU', 'US Central', 'New York', 'Singapore', 'Paris', 'UK', 'Amsterdam', 'UAE'],
      datasets: [
        {
          data: [868, 235, 108, 82, 36, 19, 57, 134],
          backgroundColor: [
            "#f17f7b",
            "#67e7f1",
            "#71ecb3",
            '#d478bc',
            '#ebcd84',
            '#9e74f7',
            '#e15079',
            '#5ce35b'
          ],
          hoverBackgroundColor: [
            "#f17f7b",
            "#67e7f1",
            "#71ecb3",
            '#d478bc',
            '#ebcd84',
            '#9e74f7',
            '#e15079',
            '#5ce35b'
          ]
        }]
    };
    this.options = {
      legend: {
        display:false
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
  }

  ngOnInit() {
    this.getSMEList();
  }

  getSMEList() {
    this.SmeList = [
      {
        domain: 'Data Science',
        subDomain: 'Model Management Managing the lifecycle of Analytical',
        name: 'John',
        email: 'john@gmail.com',
        mobileContact: 69865896855,
        city: 'Pune',
        country: 'India'

      },
      {
        domain: 'Data Science',
        subDomain: 'Data',
        name: 'John',
        email: 'john@gmail.com',
        mobileContact: 69865896855,
        city: 'Pune',
        country: 'India'

      },
      {
        domain: 'Data Science',
        subDomain: 'Data',
        name: 'John',
        email: 'john@gmail.com',
        mobileContact: 69865896855,
        city: 'Pune',
        country: 'India'

      },
      {
        domain: 'Data Science',
        subDomain: 'Model Management Managing the lifecycle of Analytical',
        name: 'John',
        email: 'john@gmail.com',
        mobileContact: 69865896855,
        city: 'Pune',
        country: 'India'

      },
      {
        domain: 'Data Science',
        subDomain: 'Model Management Managing the lifecycle of Analytical',
        name: 'John',
        email: 'john@gmail.com',
        mobileContact: 69865896855,
        city: 'Pune',
        country: 'India'

      },
      {
        domain: 'Data Science',
        subDomain: 'Model Management Managing the lifecycle of Analytical',
        name: 'John',
        email: 'john@gmail.com',
        mobileContact: 69865896855,
        city: 'Pune',
        country: 'India'

      },
      {
        domain: 'Data Science',
        subDomain: 'Model Management Managing the lifecycle of Analytical',
        name: 'John',
        email: 'john@gmail.com',
        mobileContact: 69865896855,
        city: 'Pune',
        country: 'India'

      },
      {
        domain: 'Data Science',
        subDomain: 'Model Management Managing the lifecycle of Analytical',
        name: 'John',
        email: 'john@gmail.com',
        mobileContact: 69865896855,
        city: 'Pune',
        country: 'India'

      },
      {
        domain: 'Data Science',
        subDomain: 'Model Management Managing the lifecycle of Analytical',
        name: 'John',
        email: 'john@gmail.com',
        mobileContact: 69865896855,
        city: 'Pune',
        country: 'India'

      }
    ]

    // this.smelistservice.getSMEList().subscribe((data)=>
    // {
    //   this.SmeList = data;
    // })
  }
}