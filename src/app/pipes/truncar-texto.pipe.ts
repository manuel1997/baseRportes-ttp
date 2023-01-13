import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncarTexto'
})
export class TruncarTextoPipe implements PipeTransform {

  transform(value: string, limit = 25, completeWords = false, ellipsis = '...'): any {
    // console.log('value: ' + value + ' | largo: ' + value.length);
    if (value) {
      if (value.length <= limit) {
        return value;
      } else {
        return `${value.substr(0, limit)}${ellipsis}`;
      }
    }
  }

}
