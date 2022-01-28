import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exclude',
  pure: false
})
export class ExcludePipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any[] {
    // console.log('ExcludePipe');

    if (value) {
      if (args[1] === null) {
        return [];
      }
      else {
        return value.filter(item => {
          if (!args[1].find(element => element.id === item.id)) {
            return item;
          }
        });
      }
    }
  }

}
