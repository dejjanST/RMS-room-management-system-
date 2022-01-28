import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distinct'
})
export class DistinctPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): string[] {
    // args[0] is grouping value
    // args[1] is exclude value in group

    if (value) {
      return [...new Set(value.map(item => {
        if (item[args[0]] !== args[1]) {
          return item[args[0]];
        }
      }))];
    }
  }

}
