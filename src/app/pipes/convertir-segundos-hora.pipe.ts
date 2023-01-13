import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertirSegundosHora'
})
export class ConvertirSegundosHoraPipe implements PipeTransform {
  transform(value: any): any {
    if (value < 0) {
      value = -value;
    }

    return new Date(value * 1000).toISOString().substr(11, 8);
  }
}
