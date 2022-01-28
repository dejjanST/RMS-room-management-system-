import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    days = Math.floor(value / (60 * 60 * 24));
    value -= days * 60 * 60 * 24;
    hours = Math.floor(value / 3600);
    value -= hours * 3600;
    minutes = Math.floor(value / 60);
    value -= minutes * 60;
    seconds = Math.floor(value);


    let out = '';
    if (days > 0) {
      out += days + ' days ';
    }
    if (hours > 0) {
      out += hours + ' hours ';
    }
    if (minutes > 0) {
      out += minutes + ' minutes ';
    }
    if (seconds > 0) {
      out += seconds + ' seconds ';
    }

    return out;
  }

}
