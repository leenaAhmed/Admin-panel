import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToDate'
})
export class ConvertToDatePipe implements PipeTransform {

  transform(value: number): string {
    let date = new Date(value*1000)

    return date.toLocaleDateString();
  }

}
