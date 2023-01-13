import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

//Interfaces
import { IOficina } from '../interfaces/oficinas.interface';

//URL
import { URL_SERVICIOS } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class ReportesPorOficinasService {

  ioficina:IOficina = {
    id_usuario:null,
    usuario:null,
    password:null,
    id_oficina:null,
    detalle:null,
    fechaMin:null,
    fechaMax:null
  }

  constructor(private httpClient: HttpClient) {
  }

  async motivosDePausaReporte(ioficina:IOficina) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    /* return this.httpClient.post(URL_SERVICIOS + "/Reportes/reportesPorOficina/motivosDePausa", ioficina, {
      headers: headers
    }); */
    try {
      return await this.httpClient.post(URL_SERVICIOS + "/Reportes/reportesPorOficina/motivosDePausa", ioficina, {
        headers: headers
      }).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }
  async resumenDeEjecutivo(ioficina:IOficina) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    /* return this.httpClient.post(URL_SERVICIOS + "/Reportes/reportesPorOficina/resumenDeEjecutivo", ioficina, {
      headers: headers
    }); */
    try {
      return await this.httpClient.post(URL_SERVICIOS + "/Reportes/reportesPorOficina/resumenDeEjecutivo", ioficina, {
        headers: headers
      }).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }
  async estadoDeEjecutivos(ioficina:IOficina) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    /* return this.httpClient.post(URL_SERVICIOS + "/Reportes/reportesPorOficina/estadoDeEjecutivos", ioficina, {
      headers: headers
    }); */
    try {
      return await  this.httpClient.post(URL_SERVICIOS + "/Reportes/reportesPorOficina/estadoDeEjecutivos", ioficina, {
        headers: headers
      }).toPromise();
} catch (error) {
  let resultado = {
    'status'  : false,
    'data'    : 'error al ejecutar petición',
    'codeStatus' : error.status
  };
  return resultado;
}
  }
}
