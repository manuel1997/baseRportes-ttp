import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

//Interfaces
import { IOficina } from '../interfaces/oficinas.interface';

//URL
import { URL_SERVICIOS } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class ReportesPorSerieService {

  constructor(private httpClient: HttpClient) { }

  async cargaDeTrabajoDiaria(ioficina: IOficina) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    /* return this.httpClient.post(URL_SERVICIOS + "/Reportes/reportesPorSerie/cargaDeTrabajoDiaria", ioficina, {
      headers: headers
    }); */
    try {
      return await this.httpClient.post(URL_SERVICIOS + "/Reportes/reportesPorSerie/cargaDeTrabajoDiaria", ioficina, {
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
  async resumenDeOficina(ioficina:IOficina) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    /* return this.httpClient.post(URL_SERVICIOS + "/Reportes/reportesPorSerie/resumenDeOficina", ioficina, {
      headers: headers
    }); */
    try {
      return await this.httpClient.post(URL_SERVICIOS + "/Reportes/reportesPorSerie/resumenDeOficina", ioficina, {
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
  async motivosDeAtencion(ioficina:IOficina) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    /* return this.httpClient.post(URL_SERVICIOS + "/Reportes/reportesPorSerie/motivosDeAtencion", ioficina, {
      headers: headers
    }); */
    try {
      return await this.httpClient.post(URL_SERVICIOS + "/Reportes/reportesPorSerie/motivosDeAtencion", ioficina, {
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
