import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from 'src/app/servicios/config';
import { URL_SERVICIOS } from '../config/url.servicios';
import { ISucursal } from 'src/app/interfaces/sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalService extends Config {
  private sucursal: ISucursal = {
    usuario: this.user,
    password: this.password,
    clientes_atendidos: null,
    asistentes_sucursal: null,
    tiempo_maximo_espera: null,
    clientes_espera: null,
    asistentes_atendiendo: null,
    tiempo_medio_atencion: null,
    abandono_total: null,
    actividad_asist: null,
    asistente_pausa: null,
    tiempo_medio_espera: null,

    id_usuario: 1,
    id_oficina: null
  };

  constructor(
    private httpClient: HttpClient
  ) {
    super();
   }

   async listar(id_sucursal) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.sucursal.id_oficina = id_sucursal;
    // return this.httpClient.post(URL_SERVICIOS + '/dashboard/sucursal', this.sucursal, { headers: headers });

    try {
      return await this.httpClient.post(URL_SERVICIOS + '/dashboard/sucursal', this.sucursal, { headers: headers }).toPromise();
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
