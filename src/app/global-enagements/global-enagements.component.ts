
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-global-enagements',
  templateUrl: './global-enagements.component.html',
  styleUrls: ['./global-enagements.component.scss'],
  providers: [MessageService]
})
export class GlobalEnagementsComponent implements OnInit {

    cars1 = [
      { "brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff", "edit": false },
      { "brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345", "edit": false },
      { "brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr", "edit": false },
      { "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh", "edit": false },
      { "brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34", "edit": false },
      { "brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj", "edit": false },
      { "brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr", "edit": false },
      { "brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34", "edit": false },
      { "brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5", "edit": false },
      { "brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s", "edit": false },
      { "brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff", "edit": false },
      { "brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345", "edit": false },
      { "brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr", "edit": false },
      { "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh", "edit": false },
      { "brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34", "edit": false },
      { "brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj", "edit": false },
      { "brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr", "edit": false },
      { "brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34", "edit": false },
      { "brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5", "edit": false },
      { "brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s", "edit": false }
    ];
    cars2 = this.cars1;
    cars = [];
    brands: SelectItem[];
    cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
    ];
    car = {};
    clonedCars: { [s: string]: any; } = {};
    newCar: boolean;
    displayDialog: boolean;
    selectedCar = {};

    constructor(private messageService: MessageService) { }

    ngOnInit() {
        // this.carService.getCarsSmall().then(cars => this.cars1 = cars);
        // this.carService.getCarsSmall().then(cars => this.cars2 = cars);

        this.brands = [
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'},
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'}
        ];
    }

    onRowEditInit(car: any) {
        this.clonedCars[car.vin] = {...car};
    }

    onRowEditSave(car: any) {
        if (car.year > 0) {
            delete this.clonedCars[car.vin];
            this.messageService.add({severity:'success', summary: 'Success', detail:'Car is updated'});
        }  
        else {
            this.messageService.add({severity:'error', summary: 'Error', detail:'Year is required'});
        }
    }

    onRowEditCancel(car: any, index: number) {
        this.cars2[index] = this.clonedCars[car.vin];
        delete this.clonedCars[car.vin];
    }

    showDialogToAdd() {
      this.newCar = true;
      this.car = {};
      this.displayDialog = true;
  }

  save() {
      const cars = [...this.cars];
      if (this.newCar)
          cars.push(this.car);
      else
          cars[this.cars.indexOf(this.selectedCar)] = this.car;

      this.cars = cars;
      this.car = null;
      this.displayDialog = false;
  }

  delete() {
      const index = this.cars.indexOf(this.selectedCar);
      this.cars = this.cars.filter((val, i) => i != index);
      this.car = null;
      this.displayDialog = false;
  }

}
