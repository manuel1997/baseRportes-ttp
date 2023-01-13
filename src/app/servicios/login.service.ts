import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { URL_SERVICIOS } from '../config/url.servicios';
import { URL_REPORTES } from '../config/url.servicios';

//Interfaces
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuario:Usuario = {
    usuario:"",
    password:"",
    id_usuario:"",
  }

  usuarioQMS = {
    user: 'psalazar',
    password: '123456'
  }

  constructor(private http:HttpClient) {

  }

  async login(usuario) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // return this.http.post(URL_SERVICIOS + '/Reportes/Login', usuario, {headers: headers});

    try {
      return await this.http.post(URL_SERVICIOS + '/Reportes/Login', usuario, {headers: headers}).toPromise();
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
