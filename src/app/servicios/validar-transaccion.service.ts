import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ValidarTransaccionService {
  encabezado        : string;
  largoCadena       : string;
  error             : string;
  codigoTransaccion : string;
  cantidadRegistros : string;
  descripcionErrores = new Array<ErrorMensaje>();

  constructor() {
    this.descripcionErrores.push({codigo:11501,descripcion:"Error, largo menor al permitido"});
    this.descripcionErrores.push({codigo:11502,descripcion:"Error, largo mayor al permitido"});
    this.descripcionErrores.push({codigo:11503,descripcion:"Error en el formato"});
    this.descripcionErrores.push({codigo:11504,descripcion:"Error tamaño string recv"});
    this.descripcionErrores.push({codigo:11505,descripcion:"Error comando no válido"});
    this.descripcionErrores.push({codigo:11506,descripcion:"Error checksum no válido"});
    this.descripcionErrores.push({codigo:11507,descripcion:"Error número de data no válida"});
    this.descripcionErrores.push({codigo:11510,descripcion:"Error max disponible"});
    this.descripcionErrores.push({codigo:11511,descripcion:"Error otro Adm conectado"});
    this.descripcionErrores.push({codigo:11512,descripcion:"Error en login"});
    this.descripcionErrores.push({codigo:11513,descripcion:"Error sin Permiso"});
    this.descripcionErrores.push({codigo:11520,descripcion:"Error archivo Cliente, nombre incorrecto"});
    this.descripcionErrores.push({codigo:11521,descripcion:"Error archivo Cliente, no se puede crear"});
    this.descripcionErrores.push({codigo:11530,descripcion:"Error falla open file"});
    this.descripcionErrores.push({codigo:11531,descripcion:"Error falla fijar posición"});
    this.descripcionErrores.push({codigo:11599,descripcion:"Error General"});
  }

  validarError(resultado) {
    this.encabezado   = resultado['data'].toString().substring(0, 6);
    this.largoCadena  = resultado['data'].toString().substring(6, 11);
    this.error        = resultado['data'].toString().substring(11, 14);

    if (this.encabezado == 'TS20TP' && this.largoCadena == '00024' && this.error == '999'){
      return this.descripcionErrores.find(error => error.codigo == resultado['data'].toString().substring(14, 19)).descripcion;
    }
    else {
      return 'ok';
    }
  }
  extraerCantidadRegistros(encabezado){
    this.encabezado         = encabezado.toString().substring(0, 6);
    this.largoCadena        = encabezado.toString().substring(6, 11);
    this.codigoTransaccion  = encabezado.toString().substring(11, 14);
    this.cantidadRegistros  = encabezado.toString().substring(14, encabezado.length);

    return this.cantidadRegistros;
  }

}

type ErrorMensaje = {codigo:number,descripcion:string};