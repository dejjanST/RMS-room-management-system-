import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByString'
})
export class FilterByStringPipe implements PipeTransform {

  transform(value: any[], ...args: string[]): any[] {
    // console.log('FilterByStringPipe');

    if (value && args[0]) {
      if (args[1] === null) {
        return value;
      }
      else {
        return value.filter(item => {
          return item[args[0]].toLowerCase().indexOf(args[1]?.toLowerCase().trim()) + 1;
        });
      }
    }

  }

}
