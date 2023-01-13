import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversionSegundos'
})
export class ConversionSegundosPipe implements PipeTransform {
  transform(value: any): any {
    if (value.includes('-')) {
      value = value.slice(1);
    }
    const seconds = (value) % 60
    , minutes = (value / 60) % 60
    , hours = (value / (60 * 60)) % 99;

    let hora, minutos, segundos;

    if (hours < 10) {
      hora = '0' + Math.trunc(hours);
    } else {
      hora = Math.trunc(hours);
    }

    if (minutes < 10) {
      minutos = '0' + Math.trunc(minutes);
    } else {
      minutos = Math.trunc(minutes);
    }

    if (seconds < 10) {
      segundos = '0' + Math.trunc(seconds);
    } else {
      segundos = Math.trunc(seconds);
    }

    return hora + ':' + minutos + ':' + segundos;
  }
}
