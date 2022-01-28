import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumByKey'
})
export class SumByKeyPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    let sum = 0;

    if (value) {
      // console.log(value);

      value.forEach(item => {
        sum += item[args[0]] * item.quantity;
      });
    }
    return sum;
  }

}
