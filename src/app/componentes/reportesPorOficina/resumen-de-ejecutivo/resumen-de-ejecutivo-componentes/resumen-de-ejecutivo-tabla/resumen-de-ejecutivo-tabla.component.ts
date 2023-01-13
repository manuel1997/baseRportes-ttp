import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {Router} from "@angular/router";

//Servicios
import { ApiTtpService } from '../../../../../servicios/api-ttp.service';
import { ReportesPorOficinasService } from '../../../../../servicios/reportes-por-oficinas.service';
import { ValidadorService } from '../../../../../validador/validador.service';

//Interface
import { IOficina } from '../../../../../interfaces/oficinas.interface';
import { IReporteEjecutivo } from '../../../../../interfaces/reporteEjecutivo';

//Utilidades
import Swal from 'sweetalert2';
import { ValidarTransaccionService } from '../../../../../servicios/validar-transaccion.service';

@Component({
  selector: 'app-resumen-de-ejecutivo-tabla',
  templateUrl: './resumen-de-ejecutivo-tabla.component.html',
  styleUrls: ['./resumen-de-ejecutivo-tabla.component.css']
})
export class ResumenDeEjecutivoTablaComponent implements OnInit {
  rows_oficinas: IOficina[] = [];
  @Output() getDate: EventEmitter<any> = new EventEmitter<any>();
  @Output() informacionOficina: EventEmitter<any> = new EventEmitter<any>();
  fechaMin: string = '';
  fechaMax: string = '';
  titulo: string = 'No existen Datos';
  rangoFecha: string = 'No existen Datos';

  rows_agrupacionesReportes: IReporteEjecutivo [] = [];

  constructor(private router: Router,
              private apiTtpService: ApiTtpService,
              private reportesPorOficinasService: ReportesPorOficinasService,
              private validadorService: ValidadorService,
              private validarService: ValidarTransaccionService) { }

  async ngOnInit() {
    await this.cargarDatos();
  }

  async cargarDatos() {
    this.apiTtpService.id_usuario = localStorage.getItem("repoid_usuario");
    this.apiTtpService.user = localStorage.getItem("repousuario");
    this.apiTtpService.pass_usuario = localStorage.getItem("repopassword");
    /* this.apiTtpService.obtener_oficinas().subscribe(res =>{
      let registros = res["data"].substring(14,res["data"].length - 5).split("|");
      for(let i in registros){
        let registro = registros[i].split("~");
        let ioficina: IOficina = {
          usuario:null,
          password:null,
          id_oficina: registro[0],
          detalle:registro[1],
          fechaMin:registro[2],
          fechaMax:registro[3]
        };
        this.rows_oficinas.push(ioficina);
      }
    }); */
    let data = await this.apiTtpService.obtener_oficinas();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      if (this.validarService.validarError(data) == 'ok') {
        let registros = data["data"].substring(14, data["data"].length - 5).split("|");
        for(let i in registros){
          let registro = registros[i].split("~");
          let ioficina: IOficina = {
            usuario:null,
            password:null,
            id_oficina: registro[0],
            detalle:registro[1],
            fechaMin:registro[2],
            fechaMax:registro[3]
          };
          this.rows_oficinas.push(ioficina);
        }
      } else {
        Swal('Error', this.validarService.validarError(data), 'error');
      }
    }
  }
  async mostrarReporte(oficina){
    let ioficina:IOficina = {
      usuario:null,
      password:null,
      id_oficina: null,
      detalle:null,
      fechaMin:null,
      fechaMax:null};
    ioficina.id_usuario = Number(localStorage.getItem("repoid_usuario"));
    ioficina.usuario = localStorage.getItem("repousuario");
    ioficina.password = localStorage.getItem("repopassword");
    this.getDate.emit();
    if(this.validadorService.rangoFechaPermitido(this.fechaMin, this.fechaMax)){
      ioficina.fechaMin = this.fechaMin.split("-")[2] + "/" + this.fechaMin.split("-")[1] + "/" + this.fechaMin.split("-")[0];
      ioficina.fechaMax = this.fechaMax.split("-")[2] + "/" + this.fechaMax.split("-")[1] + "/" + this.fechaMax.split("-")[0];
      ioficina.id_oficina = oficina;
      /* this.reportesPorOficinasService.resumenDeEjecutivo(ioficina).subscribe(data => {
        this.informacionOficina.emit(data);
      }); */
      let data = await this.reportesPorOficinasService.resumenDeEjecutivo(ioficina);
      if (data['data'] == '' || data['data'] == undefined) {
        Swal('Error', 'Se ha producido un error.', 'error');
      } else {
        if (this.validarService.validarError(data) == 'ok') {
          this.informacionOficina.emit(data);
        } else {
          // Swal('Error', this.validarService.validarError(data), 'error');
        }
      }
    }
    else{
      Swal('Alerta', 'Rango de fecha no validos', 'error');
    }
  }
  async generarExcel(oficina){
    let ioficina:IOficina = {
      usuario:null,
      password:null,
      id_oficina: null,
      detalle:null,
      fechaMin:null,
      fechaMax:null
    };
    ioficina.id_usuario = Number(localStorage.getItem("repoid_usuario"));
    ioficina.usuario = localStorage.getItem("repousuario");
    ioficina.password = localStorage.getItem("repopassword");
    this.getDate.emit();
    if(this.validadorService.rangoFechaPermitido(this.fechaMin, this.fechaMax)){
      ioficina.fechaMin = this.fechaMin.split("-")[2] + "/" + this.fechaMin.split("-")[1] + "/" + this.fechaMin.split("-")[0] + "/";
      ioficina.fechaMax = this.fechaMax.split("-")[2] + "/" + this.fechaMax.split("-")[1] + "/" + this.fechaMax.split("-")[0] + "/";
      ioficina.id_oficina = oficina;
      /* this.reportesPorOficinasService.resumenDeEjecutivo(ioficina).subscribe(data => {
        let registros = data["data"].substring(14, data["data"].length - 5).split("|");
        let cabecera = registros[0].split("~");
        this.titulo = cabecera[0];
        this.rangoFecha = "Entre " + cabecera[1] + " y " + cabecera[2];
        this.rows_agrupacionesReportes.length = 0;
        let contador = 0;
        for(let i in registros){
          if(contador > 0 && registros[i] != ""){
            let registro = registros[i].split("~");
            let iReporteEjecutivo:IReporteEjecutivo = {
              id:registro[0],
              ejecutivo:registro[1],
              apagadoHora:registro[2],
              apagadoPorcentaje:registro[3],
              activoHora:registro[4],
              activoPorcentaje:registro[5],
              atendiendoHora:registro[6],
              atendiendoPorcentaje:registro[7],
              pausaHora:registro[8],
              pausaPorcentaje:registro[9]
            }
            this.rows_agrupacionesReportes.push(iReporteEjecutivo);
          }
          contador++;
        }
        setTimeout(function(){
          let tmpElemento = document.createElement('a');
          let data_type = 'data:application/vnd.ms-excel;charset=UTF-8;';
          let tabla_div = document.getElementById('divReporte');
          let tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
          tmpElemento.href = data_type + ', ' + tabla_html;
          tmpElemento.download = 'ResumenDeEjecutivos.xls';
          tmpElemento.click();
        }, 1000);
      }); */

      let data = await this.reportesPorOficinasService.resumenDeEjecutivo(ioficina);
      if (data['data'] == '' || data['data'] == undefined) {
        Swal('Error', 'Se ha producido un error.', 'error');
      } else {
        if (this.validarService.validarError(data) == 'ok') {
          let registros = data["data"].substring(14, data["data"].length - 5).split("|");
          let cabecera = registros[0].split("~");
          this.titulo = cabecera[0];
          this.rangoFecha = "Entre " + cabecera[1] + " y " + cabecera[2];
          this.rows_agrupacionesReportes.length = 0;
          let contador = 0;
          for(let i in registros){
            if(contador > 0 && registros[i] != ""){
              let registro = registros[i].split("~");
              let iReporteEjecutivo:IReporteEjecutivo = {
                id:registro[0],
                ejecutivo:registro[1],
                apagadoHora:registro[2],
                apagadoPorcentaje:registro[3],
                activoHora:registro[4],
                activoPorcentaje:registro[5],
                atendiendoHora:registro[6],
                atendiendoPorcentaje:registro[7],
                pausaHora:registro[8],
                pausaPorcentaje:registro[9]
              }
              this.rows_agrupacionesReportes.push(iReporteEjecutivo);
            }
            contador++;
          }
          setTimeout(function(){
            let tmpElemento = document.createElement('a');
            let data_type = 'data:application/vnd.ms-excel;charset=UTF-8;';
            let tabla_div = document.getElementById('divReporte');
            let tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
            tmpElemento.href = data_type + ', ' + tabla_html;
            tmpElemento.download = 'ResumenDeEjecutivos.xls';
            tmpElemento.click();
          }, 1000);
        } else {
          Swal('Error', this.validarService.validarError(data), 'error');
        }
      }
    }
    else{
      Swal('Alerta', 'Rango de fecha no validos', 'error');
    }
  }

}
