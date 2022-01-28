import { Pipe, PipeTransform } from '@angular/core';
import { Equipment } from 'projects/definition/src/app/unitType/models/equipment.Model';

@Pipe({
  name: 'byKeyValue'
})
export class ByKeyValuePipe implements PipeTransform {

  transform(value: Equipment[], ...args: any[]): any[] {

    if (value) {
      // console.log(value);

      return value.filter(item => {
        return item[args[0]] === args[1];
      });
    }
  }

}
