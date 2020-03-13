
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterTags'
})
export class FilterTagsPipe implements PipeTransform {

    transform(value:any,search:string):any{
        if(!search){ return value;}
        let solution = value.filter( (v:any) =>{
            return v.toLowerCase().indexOf(search.toLowerCase()) != -1;
        })
        return solution;
    }

}