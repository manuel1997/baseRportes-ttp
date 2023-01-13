import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

//Servicios
import { ApiTtpService } from '../../../../../servicios/api-ttp.service';
import { AuthService } from '../../../../../servicios/auth.service';
import { ValidarTransaccionService } from '../../../../../servicios/validar-transaccion.service';

//Utilidades
import Swal from 'sweetalert2';
const EXCEL_EXTENSION = '.xls';
const EXCEL_TYPE = 'data:application/vnd.ms-excel;charset=UTF-8;';

@Component({
  selector: 'app-tendencia-atencion-reporte',
  templateUrl: './tendencia-atencion-reporte.component.html',
  styleUrls: ['./tendencia-atencion-reporte.component.css']
})
export class TendenciaAtencionReporteComponent implements OnInit {
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();

  superior:any[] = [];
  periodos:any[] = [];
  datos:any[] = [];
  gifCarga = true;

  rango:string = "";

  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  constructor(private authService: AuthService,
              private router: Router,
              private _api: ApiTtpService,
              private validarService: ValidarTransaccionService) {

  }

  ngOnInit() {
  }

  async mostrarReporte() {
    this.datos.length = 0;
    this.superior.length = 0;
    this.periodos.length = 0;
    this.rango = "";

    let data = await this._api.rgnoa_noagrTendenciaAtencion();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      let resultado = this.validarService.validarError(data);
      if(resultado == 'ok'){
      // if (data.data == "error login" || data.data.includes("999")) {
        let str:string;
        str = data.data;
        let registros = str.substring(14, str.length - 5).split("|");
        for (let index = 0; index < registros.length; index++) {
          let campos = registros[index].split("~");
          switch (index) {
            case 0:
              this.superior = campos;
            break;
            case 1:
              campos.splice(0, 3);
              this.fecha(campos, this.superior[2]);
            break;
            default:
              this.datos.push(campos);
            break;
          }
        }
      } else {
        Swal('Error', 'Error Login', 'error');
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }
    this.gifCarga = false;
  }

  async generarExcel(){
    this.datos.length = 0;
    this.superior.length = 0;
    this.periodos.length = 0;
    this.rango = "";

    let data = await this._api.rgnoa_noagrTendenciaAtencion();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      let resultado = this.validarService.validarError(data);
      if(resultado == 'ok'){
        let str:string;
        str = data.data;
        let registros = str.substring(14, str.length - 5).split("|");
        for (let index = 0; index < registros.length; index++) {
          let campos = registros[index].split("~");
          switch (index) {
            case 0:
              this.superior = campos;
            break;
            case 1:
              campos.splice(0, 3);
              this.fecha(campos, this.superior[2]);
            break;
            default:
              this.datos.push(campos);
            break;
          }
        }
        var tmpElemento = document.createElement('a');
        setTimeout(() => {
          var tabla_div = document.getElementById('divReporte');
          var els = tabla_div.getElementsByTagName('td');
          for (let i = 0; i < els.length; i++) {
            if (els[i].hasAttribute('hidden')) {
                els[i].remove();
            }
          }
          var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
          tmpElemento.href = EXCEL_TYPE + ', ' + tabla_html;
          tmpElemento.download = 'Tendencia_Atencion_' + new Date().getTime() + EXCEL_EXTENSION;
          tmpElemento.click();
        } , 1200);
      } else {
        Swal('Error', this.validarService.validarError(data), 'error');
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }
  }

  fecha(arreglo, tipo){
    let anio = (new Date()).getFullYear();
    let elemento;
    let dd;
    let mm;
    let resp;
    for (let index = 0; index < arreglo.length; index++) {
      if (arreglo[index] == 0) {
        let resp = 'Total';
        this.periodos.push(resp);
      } else {
        switch (tipo) {
          case 'M':
            elemento = new Date(arreglo[index]);
            mm = this.meses[elemento.getMonth()];
            this.periodos.push(mm);
            this.rango = 'Meses';
          break;
          case 'S':
            elemento = new Date(anio, 0, (arreglo[index] - 1) * 7 + 1);
            dd = elemento.getDate();
            mm = elemento.getMonth()+1;
            resp;
            if(dd < 10){
              resp = '0' + dd+'/'+mm;
            } else {
              resp = dd+'/'+mm;
            }
            this.periodos.push(resp);
            this.rango = 'Semanas';
          break;
          case 'D':
            this.periodos.push(arreglo[index]);
            this.rango = 'Días';
          break;
          default:
            this.periodos.push(arreglo[index]);
            this.rango = 'Días';
          break;
        }
      }
    }
  }

  atras(){
    this.btnVolver.emit();
  }

}
