import { Injectable } from '@angular/core';
import { IZonas } from 'src/app/interfaces/zonas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from './config';
import { URL_SERVICIOS } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class ZonasService extends Config {
  private izona: IZonas = {
    usuario: this.user,
    password: this.password,
    id_zona: null,
    nombre_zona: null,
    porcentaje_abandono: null,
    porcentaje_nivel_servicio: null,
    clientes_espera: null,
    tiempo_max_espera: null,
    tiempo_espera_promedio: null,
    tiempo_atencion_promedio: null,
    asistentes_atendiendo: null,
    asistentes_en_pausas: null,
    dotacion_sucursales: null,
    porcentaje_actividad: null,
    turnos_emitidos: null,
    clientes_atendidos: null,
    clientes_abandonados: null,

    id_usuario: Number(localStorage.getItem('repoid_usuario')),
    id_oficina: null
  };

  constructor(
    private httpClient: HttpClient
  ) {
    super();
   }

  async listarZonas() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // return this.httpClient.post(URL_SERVICIOS + '/dashboard/zonas', this.izona, {headers: headers});

    try {
      return await this.httpClient.post(URL_SERVICIOS + '/dashboard/zonas', this.izona, {headers: headers}).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  async listarSucursalesZona(id_oficina) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.izona.id_oficina = id_oficina;
    // return this.httpClient.post(URL_SERVICIOS + '/dashboard/sucursales', this.izona, {headers: headers});

    try {
      return await this.httpClient.post(URL_SERVICIOS + '/dashboard/sucursales', this.izona, {headers: headers}).toPromise();
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
