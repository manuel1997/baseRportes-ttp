import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { map } from 'rxjs/operators';

import { URL_SERVICIOS } from '../config/url.servicios';

//Interfaces
import { Serie } from '../interfaces/serie.interface';
import { Usuario } from '../interfaces/usuario.interface';
import { ResumenAgrupado } from '../interfaces/rga_resumenagrupado.interface';
import { RangoEsperaAtencionNoAgrupado } from '../interfaces/rgnoaRangoAtencionEspera.interface';
import { rgnoaTendenciaAtencion } from '../interfaces/rgnoaTendenciaAtencion.interface';
import { CargaTrabajoHoraNoAgrupado } from '../interfaces/rgnoaCargaTrabajoHora.interface';
import { ResumenNoAgrupado } from '../interfaces/rgnoagrResumenEA.interface';
import { ResumenMensualNoAgrupado } from '../interfaces/rgnoagrResumenMensual.interface';
import { RankingAtencionNoAgrupado } from '../interfaces/rgnoagrRankingAtencion.interface';
import { ResumenTOLNoAgrupado } from '../interfaces/rgnoagr_ResumenTOL.interface';
import { OficinaReporte } from '../interfaces/oficinasOnline';

/*Interface Reporte por Serie*/
import { rps_reporteProduccion } from '../interfaces/rps_reporteProduccion.interface';
import { rps_rankingEjecutivos } from '../interfaces/rps_rankingDeEjecutivos.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiTtpService {

  nombre_usuario:string = "";
  id_usuario:string = "";
  pass_usuario:string = "";
  user:string = "";

  serie:Serie = {
    usuario:"",
    password:"",
    id_usuario:"",
    id_servicio:"",
  }

  usuario:Usuario = {
    usuario:"",
    password:"",
    id_usuario:"",
  }

  resumen_agr: ResumenAgrupado = {
    usuario:"",
    password:"",
    id_usuario:"",
    id_oficina:"",
    id_servicio:"",
    diaI:"",
    diaF:"",
    horaI:"",
    horaF:"",
    intervalo:"",
    limite:"",
  }

  rangoEsperaAtencion_noagr: RangoEsperaAtencionNoAgrupado = {
    usuario:"",
    password:"",
    id_usuario:"",
    id_oficina:"",
    id_servicio:"",
    Mes: "",
    horaI1: "",
    horaF1: "",
    horaI2: "",
    horaF2: "",
    rango: "",
  }

  TendenciaAtencion_noagr: rgnoaTendenciaAtencion = {
    usuario: "",
    password: "",
    id_usuario: "",
    id_oficina: "",
    id_servicio: "",
    fechaI:"",
    fechaF:"",
    periodo:"",
    g: "",
  }

  CargaTrabajoHora_noagr: CargaTrabajoHoraNoAgrupado = {
    usuario:"",
    password:"",
    id_usuario:"",
    id_oficina:"",
    id_servicio:"",
    fechaI:"",
    fechaF:"",
    horaI:"",
    horaF:"",
  }

  resumenea_noagr: ResumenNoAgrupado = {
    usuario:"",
    password:"",
    id_usuario:"",
    id_oficina:"",
    id_servicio:"",
    diaI:"",
    diaF:"",
    horaI:"",
    horaF:"",
    intervalo:"",
    limite:"",
    g:"",
  }

  resumenmensual_noagr: ResumenMensualNoAgrupado = {
    usuario:"",
    password:"",
    id_usuario:"",
    id_oficina:"",
    id_servicio:"",
    mes:"",
    horaI:"",
    horaF:"",
  }

  rankingatencion_noagr: RankingAtencionNoAgrupado = {
    usuario:"",
    password:"",
    id_usuario:"",
    id_oficina:"",
    id_servicio:"",
    mes:"",
    g:"",
  }

  resumentol_noagr: ResumenTOLNoAgrupado = {
    usuario:"",
    password:"",
    id_usuario:"",
    id_oficina:"",
    id_servicio:"",
    mes:"",
  }

  rps_reporteProduccion: rps_reporteProduccion = {
    usuario:"",
    password:"",
    id_usuario:"",
    id_oficina:"",
    id_servicio:"",
    dia: "",
    agrupado: "",
    periodo: "",
  }

  rps_rankingEjecutivos: rps_rankingEjecutivos = {
    usuario:"",
    password:"",
    id_usuario:"",
    id_oficina:"",
    id_servicio:"",
    diaI: "",
    diaF: "",
  }

  oficinasEnLinea: OficinaReporte = {
    usuario:"",
    password:"",
    id_usuario:"",
    id_oficina:"",
    id_zona: ''
  }

  constructor(private http:Http) {
  }

  async obtener_series() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.serie = {
      usuario : localStorage.getItem("repousuario"),
      password : localStorage.getItem("repopassword"),
      id_usuario : localStorage.getItem("repoid_usuario"),
      id_servicio : '0',
    };

    /* return this.http.post(URL_SERVICIOS+'/Reportes/serie', this.serie, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })); */

    try {
      return await this.http.post(URL_SERVICIOS + '/Reportes/serie', this.serie, {headers: headers})
                .pipe(map( res => {
                  let resp = res.json();
                  return resp;
                })).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }

  }

  async obtener_oficinas() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.usuario = {
      usuario : localStorage.getItem("repousuario"),
      password : localStorage.getItem("repopassword"),
      id_usuario : localStorage.getItem("repoid_usuario"),
    };

    /* return this.http.post(URL_SERVICIOS+'/Reportes/oficina', this.usuario, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })); */

    try {
      return await this.http.post(URL_SERVICIOS + '/Reportes/oficina', this.usuario, {headers: headers})
                .pipe(map( res => {
                  let resp = res.json();
                  return resp;
                })).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  async obtenerOficina_reporte() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    this.oficinasEnLinea = {
      usuario : localStorage.getItem("repousuario"),
      password : localStorage.getItem("repopassword"),
      id_usuario : localStorage.getItem("repoid_usuario"),
      id_oficina : '0',
      id_zona: localStorage.getItem('id_zona')
    };

    try {
      return this.http.post(URL_SERVICIOS + '/Reportes/oficinaReporte', this.oficinasEnLinea, {headers: headers})
                      .pipe(map( res => {
                        let resp = res.json();
                        return resp;
                      })).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }

    /*return this.http.post(URL_SERVICIOS+'/Reportes/oficinaReporte', this.oficinasEnLinea, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                }));*/
  }

  async obtenerDetalleOficina_reporte(oficina: OficinaReporte) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    try {
      return this.http.post(URL_SERVICIOS + '/Reportes/oficinaReporteDetalles', oficina, {headers: headers})
                      .pipe(map( res => {
                        let resp = res.json();
                        return resp;
                      })).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }

   /*return this.http.post(URL_SERVICIOS+'/Reportes/oficinaReporteDetalles', oficina, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                }));*/
  }

  datos_consulta_agrupada(parametros, series, oficinas) {

    this.resumen_agr = {
      usuario : localStorage.getItem("repousuario"),
      password : localStorage.getItem("repopassword"),
      id_usuario : localStorage.getItem("repoid_usuario"),
      id_oficina : oficinas,
      id_servicio : series,
      diaI : parametros.diaI,
      diaF : parametros.diaF,
      horaI : parametros.horaI,
      horaF : parametros.horaF,
      intervalo : parametros.intervalo,
      limite : parametros.limite,
    };
  }

  // Resumen Global Agrupados
  async rga_resumenespera() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    /* return this.http.post(URL_SERVICIOS + '/Reportes/rga_resumenespera', this.resumen_agr, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })); */

    try {
      return await this.http.post(URL_SERVICIOS + '/Reportes/rga_resumenespera', this.resumen_agr, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  async rga_resumenatencion() {
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    /* return this.http.post(URL_SERVICIOS + '/Reportes/rga_resumenatencion', this.resumen_agr, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })); */

    try {
      return await this.http.post(URL_SERVICIOS + '/Reportes/rga_resumenatencion', this.resumen_agr, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  //Resumen Global No Agrupados

  datos_rgnoaRangos(parametros, series, oficinas){

    this.rangoEsperaAtencion_noagr = {
      usuario : localStorage.getItem("repousuario"),
      password : localStorage.getItem("repopassword"),
      id_usuario : localStorage.getItem("repoid_usuario"),
      id_oficina : oficinas,
      id_servicio : series,
      Mes: parametros.Mes,
      horaI1: parametros.horaI1,
      horaF1: parametros.horaF1,
      horaI2: parametros.horaI2,
      horaF2: parametros.horaF2,
      rango: parametros.rango,
    };

  }

  async rgnoa_rangoespera() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    /* return this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrRangoEspera', this.rangoEsperaAtencion_noagr, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })); */
    try {
      return await this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrRangoEspera', this.rangoEsperaAtencion_noagr, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  async rgnoa_rangoatencion() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    /* return this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrRangoAtencion', this.rangoEsperaAtencion_noagr, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })); */

    try {
      return await this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrRangoAtencion', this.rangoEsperaAtencion_noagr, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  datos_noagrTendenciaAtencion(parametros, series, oficinas){
    this.TendenciaAtencion_noagr = {
      usuario : localStorage.getItem("repousuario"),
      password : localStorage.getItem("repopassword"),
      id_usuario : localStorage.getItem("repoid_usuario"),
      id_oficina : oficinas,
      id_servicio : series,
      fechaI: parametros.fechaI,
      fechaF: parametros.fechaF,
      periodo: parametros.periodo,
      g: parametros.g,
    }
  }

  async rgnoa_noagrTendenciaAtencion() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    /* return this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrTendenciaAtencion', this.TendenciaAtencion_noagr, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })); */

    try {
      return await this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrTendenciaAtencion', this.TendenciaAtencion_noagr, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  datos_noagrCargaTrabajoHora(parametros, series, oficinas) {
    this.CargaTrabajoHora_noagr = {
      usuario : localStorage.getItem("repousuario"),
      password : localStorage.getItem("repopassword"),
      id_usuario : localStorage.getItem("repoid_usuario"),
      id_oficina : oficinas,
      id_servicio : series,
      fechaI: parametros.fechaI,
      fechaF: parametros.fechaF,
      horaI: parametros.horaI,
      horaF: parametros.horaF,
    };
  }

  async rgnoa_noagrCargaTrabajoHora() {
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    /* return this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrCargaTrabajoHora', this.CargaTrabajoHora_noagr, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })); */

    try {
      return await this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrCargaTrabajoHora', this.CargaTrabajoHora_noagr, {headers: headers})
                .pipe(map(res => {
                  let resp = res.json();
                  return resp;
                })).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  datos_noagrResumenEA(parametros, series, oficinas){
    this.resumenea_noagr = {
      usuario : localStorage.getItem("repousuario"),
      password : localStorage.getItem("repopassword"),
      id_usuario : localStorage.getItem("repoid_usuario"),
      id_oficina : oficinas,
      id_servicio : series,
      diaI : parametros.diaI,
      diaF : parametros.diaF,
      horaI : parametros.horaI,
      horaF : parametros.horaF,
      intervalo : parametros.intervalo,
      limite : parametros.limite,
      g : parametros.g,
    }
  }

  async rgnoa_noagrResumenEA() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    /* return this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrResumenEspera', this.resumenea_noagr, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })); */

    try {
      return await this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrResumenEspera', this.resumenea_noagr, {headers: headers})
                .pipe(map( res => {
                  let resp = res.json();
                  return resp;
                })).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  async rgnoa_noagrResumenA() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    /* return this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrResumenAtencion', this.resumenea_noagr, {headers: headers})
                .pipe(map( res => {
                  let resp = res.json();
                  return resp;
                })); */

    try {
      return await this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrResumenAtencion', this.resumenea_noagr, {headers: headers})
                .pipe(map( res => {
                  let resp = res.json();
                  return resp;
                })).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  datos_noagrResumenMensual(parametros, series, oficinas){
    this.resumenmensual_noagr = {
      usuario : localStorage.getItem("repousuario"),
      password : localStorage.getItem("repopassword"),
      id_usuario : localStorage.getItem("repoid_usuario"),
      id_oficina : oficinas,
      id_servicio : series,
      mes : parametros.mes,
      horaI : parametros.horaI,
      horaF : parametros.horaF,
    }
  }

  async rgnoa_noagrResumenMensual() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    /* return this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrResumenMensual', this.resumenmensual_noagr, {headers: headers})
                .pipe(map( res => {
                  let resp = res.json();
                  return resp;
                })); */

    try {
      return await this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrResumenMensual', this.resumenmensual_noagr, {headers: headers})
                .pipe(map( res => {
                  let resp = res.json();
                  return resp;
                })).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  datos_noagrRankingAtencion(parametros, series, oficinas){
    this.rankingatencion_noagr = {
      usuario : localStorage.getItem("repousuario"),
      password : localStorage.getItem("repopassword"),
      id_usuario : localStorage.getItem("repoid_usuario"),
      id_oficina : oficinas,
      id_servicio : series,
      mes : parametros.mes,
      g : parametros.g,
    }
  }

  async rgnoa_noagrRankingAtencion() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    /* return this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrRankingAtencion', this.rankingatencion_noagr, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })); */

    try {
      return await this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrRankingAtencion', this.rankingatencion_noagr, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  datos_noagrResumentol(parametros, series, oficinas){
    this.resumentol_noagr = {
      usuario : localStorage.getItem("repousuario"),
      password : localStorage.getItem("repopassword"),
      id_usuario : localStorage.getItem("repoid_usuario"),
      id_oficina : oficinas,
      id_servicio : series,
      mes : parametros.mes,
    }
  }

  async rgnoa_noagrResumentol() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    /* return this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrResumenTol', this.resumentol_noagr, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })); */

    try {
      return await this.http.post(URL_SERVICIOS + '/Reportes/repNoAgrResumenTol', this.resumentol_noagr, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  datos_rps_Produccion(parametros, series, oficinas){
    this.rps_reporteProduccion = {
      usuario : localStorage.getItem("repousuario"),
      password : localStorage.getItem("repopassword"),
      id_usuario : localStorage.getItem("repoid_usuario"),
      id_oficina : oficinas,
      id_servicio : series,
      dia : parametros.dia,
      agrupado : parametros.agrupado,
      periodo : parametros.periodo,
    }
  }

  async reportePorSerie_Produccion() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    /* return this.http.post(URL_SERVICIOS + '/Reportes/reportesPorSerie/Produccion', this.rps_reporteProduccion, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })); */

    try {
      return await this.http.post(URL_SERVICIOS + '/Reportes/reportesPorSerie/Produccion', this.rps_reporteProduccion, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })).toPromise();
    } catch (error) {
      let resultado = {
        'status'  : false,
        'data'    : 'error al ejecutar petición',
        'codeStatus' : error.status
      };
      return resultado;
    }
  }

  datos_rps_rankingEjecutivo(parametros, series, oficinas) {
    this.rps_rankingEjecutivos = {
      usuario : localStorage.getItem("repousuario"),
      password : localStorage.getItem("repopassword"),
      id_usuario : localStorage.getItem("repoid_usuario"),
      id_oficina : oficinas,
      id_servicio : series,
      diaI : parametros.diaI,
      diaF : parametros.diaF,
    }
  }

  async reportePorSerie_RankingEjecutivo() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    /* return this.http.post(URL_SERVICIOS + '/Reportes/reportesPorSerie/rankingDeEjecutivos', this.rps_rankingEjecutivos, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })); */

    try {
      return await this.http.post(URL_SERVICIOS + '/Reportes/reportesPorSerie/rankingDeEjecutivos', this.rps_rankingEjecutivos, {headers: headers})
                .pipe(map( res=>{
                  let resp = res.json();
                  return resp;
                })).toPromise();
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
