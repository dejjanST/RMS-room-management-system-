import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byRegex'
})
export class ByRegexPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any[] {
    if (value) {
      // console.log(value);

      return value.filter(item => {
        return item[args[0]].match(args[1]);
      });
    }
  }

}
