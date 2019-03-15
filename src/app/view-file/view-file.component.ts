import { DataShareService } from './../shared/data-share.service';
import { Component, OnInit } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.scss']
})
export class ViewFileComponent implements OnInit {
  filePath: string = '';
  localFilePath: string = '';
  model: any = {};
  annotations = [];
  constructor(private dataShareService: DataShareService) { }
    ngOnInit() {
    this.localFilePath = this.dataShareService.getfileUrl();
    var filename = this.localFilePath.split('\\').pop();
    this.filePath = `../assets/docs/${filename}`;
  }
    onSubmit() { }
    addAnnotation(newAnnotation: string) {
    if (newAnnotation) {
      this.annotations.push(newAnnotation);
    }
  }

  // data: CloudData[] = [
  //   { text: 'credit', weight: 7, rotate: 10,color: '#ffaaee' },
  //   { text: 'JP', weight: 5, rotate: -20 },
  //   { text: 'cash', weight: 9, rotate: 35,color: '#FA8072' },
  //   { text: 'user', weight: 7, rotate: 10 },
  //   { text: 'payment', weight: 9, rotate: 2,color: '#ffaaee' },
  //   { text: 'wells', weight: 6, rotate: 15 },
  //   { text: 'debit', weight: 7, rotate: -15 ,color: '#FA8072'},
 // ];

}
