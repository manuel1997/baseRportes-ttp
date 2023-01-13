import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {

  constructor() {

  }

  rangoFechaPermitido(fechaInicial, fechaFinal){
    return fechaInicial <= fechaFinal;
  }

  rangoHoraPermitido(horaInicial, horaFinal){
    return horaInicial <= horaFinal;
  }

  valorHora(control: FormControl): {[s:string]:boolean} {
    if (control.value > 23) {
      control.setValue('');
      return {
        valorhora:true
      }
    }
    return null;
  }

}
