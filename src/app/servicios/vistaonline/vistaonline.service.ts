import { URL_SERVICIOS } from './../../config/url.servicios';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IVista } from '../../interfaces/vistaonline/vistaonline';

@Injectable({
  providedIn: 'root'
})
export class VistaonlineService {
  iVista: IVista = {
    usuario: localStorage.getItem('repousuario'),
    password: localStorage.getItem('repopassword'),
    id_usuario: null,
    id_oficina: null,
    nombre_oficina: null,
    max_cliente: null
  };

  constructor(private httpClient: HttpClient) {  }

  listarVista(iVista: IVista) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    try {
      return this.httpClient.post(URL_SERVICIOS + '/dashboard/vistaonline', iVista, {headers: headers}).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  async listarOficinas(iVista: IVista) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    try {
      return this.httpClient.post(URL_SERVICIOS + '/dashboard/oficinas', iVista, {headers: headers}).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  detalleOficina(iVista: IVista) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    try {
      return this.httpClient.post(URL_SERVICIOS + '/dashboard/detalle', iVista, {headers: headers}).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

   /*Temporal Lista Espera
  detalleoficina_nueva() {
    return this.httpClient.get(this.API_SERVICIOS + '/500/tipo/tcp');
  }

  listaespera_nueva() {
    return this.httpClient.get(this.API_SERVICIOS + '/501/tipo/tcp/escritorios/15/clientes/15');
  }*/
}
