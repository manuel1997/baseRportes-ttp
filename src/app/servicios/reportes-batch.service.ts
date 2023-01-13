import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Config
import { URL_SERVICIOS } from '../config/url.servicios';

// Interfaces
import { IReportesBatch } from '../interfaces/reportes-batch';

@Injectable({
  providedIn: 'root'
})
export class ReportesBatchService {
  iReportesBatch: IReportesBatch = {
    usuario: localStorage.getItem('repousuario'),
    password: localStorage.getItem('repopassword'),
    desde: '',
    hasta: '',
    id_usuario: Number(localStorage.getItem('repoid_usuario'))
  };

  constructor(private httpClient: HttpClient) { }

  async solicitarBatch(batch) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    /* return this.httpClient.post<IReportesBatch[]>(
      URL_SERVICIOS + '/Reportes/solicitarBatch', batch, {headers: headers}
    ); */

    try {
      return await this.httpClient.post<IReportesBatch[]>(
        URL_SERVICIOS + '/Reportes/solicitarBatch', batch, {headers: headers}
      ).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  async listarBatch() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    /* return this.httpClient.post<IReportesBatch[]>(
      URL_SERVICIOS + '/Reportes/listarBatch', this.iReportesBatch, {headers: headers}
    ); */

    try {
      return await this.httpClient.post<IReportesBatch[]>(
        URL_SERVICIOS + '/Reportes/listarBatch', this.iReportesBatch, {headers: headers}
      ).toPromise();
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
