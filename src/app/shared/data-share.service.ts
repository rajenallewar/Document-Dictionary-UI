import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  filePath: string;
  constructor() { }

  setfileUrl (url) {
    this.filePath = url;
  }

  getfileUrl () {
    return this.filePath ? this.filePath : '';
  }

}
