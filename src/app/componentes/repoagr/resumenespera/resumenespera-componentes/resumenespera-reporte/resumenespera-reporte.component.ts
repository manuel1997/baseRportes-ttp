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
  selector: 'app-resumenespera-reporte',
  templateUrl: './resumenespera-reporte.component.html',
  styleUrls: ['./resumenespera-reporte.component.css']
})
export class ResumenesperaReporteComponent implements OnInit {
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();

  superior:any[] = [];
  datos:any[] = [];
  gifCarga = true;

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
    let data = await this._api.rga_resumenespera();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      let resultado = this.validarService.validarError(data);
      if (resultado == 'ok') {
      // if (data.data == "error login") {
        let str:string;
        str = data.data;
        let registros = str.substring(14, str.length - 5).split("|");
        for (let index = 0; index < registros.length; index++) {
          let campos = registros[index].split("~");
          if (index == 0) {
            this.superior = campos;
          } else {
            if (campos[0] == 'TOT') {
              campos[0] = 'Totales';
            }
            this.datos.push({
              //Sin TOL
              // "min":campos[0],
              // "normal": campos[1],
              // "especial": campos[2],
              // "total": campos[3],
              // "porcentaje1": campos[4],
              // "n": campos[5],
              // "porcentaje2": campos[6],
              // "rango": campos[7],
              // "acum1": campos[8],
              // "acum2": this.minuto(campos[9])
              //TOL
              "min":campos[0],
              "normal": campos[1],
              "tol":campos[2],
              "especial": campos[3],
              "total": campos[4],
              "porcentaje1": campos[5],
              "n": campos[6],
              "porcentaje2": campos[7],
              "rango": campos[8],
              "acum1": campos[9],
              "acum2": this.minuto(campos[10]),
              "acum3": this.minuto(campos[11])
            });
          }
        }
      } else {
        Swal('Error', this.validarService.validarError(data), 'error');
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }
    this.gifCarga =  false;
  }

  async generarExcel() {
    this.datos.length = 0;
    this.superior.length = 0;

    let data = await this._api.rga_resumenespera();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      let resultado = this.validarService.validarError(data);
      if (resultado == 'ok') {
        let str:string;
        str = data.data;
        let registros = str.substring(14, str.length - 5).split("|");
        for (let index = 0; index < registros.length; index++) {
          let campos = registros[index].split("~");
          if (index == 0) {
            this.superior = campos;
          } else {
            if (campos[0] == 'TOT') {
              campos[0] = 'Totales';
            }
            this.datos.push({
              //Sin TOL
              // "min":campos[0],
              // "normal": campos[1],
              // "especial": campos[2],
              // "total": campos[3],
              // "porcentaje1": campos[4],
              // "n": campos[5],
              // "porcentaje2": campos[6],
              // "rango": campos[7],
              // "acum1": campos[8],
              // "acum2": this.minuto(campos[9])
              //TOL
              "min":campos[0],
              "normal": campos[1],
              "tol":campos[2],
              "especial": campos[3],
              "total": campos[4],
              "porcentaje1": campos[5],
              "n": campos[6],
              "porcentaje2": campos[7],
              "rango": campos[8],
              "acum1": campos[9],
              "acum2": this.minuto(campos[10]),
              "acum3": this.minuto(campos[11])
            });
          }
        }
        var tmpElemento = document.createElement('a');
        setTimeout(() => {
          var tabla_div = document.getElementById('divReporte');
          var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
          tmpElemento.href = EXCEL_TYPE + ', ' + tabla_html;
          tmpElemento.download = 'Reporte_Espera_' + new Date().getTime() + EXCEL_EXTENSION;
          tmpElemento.click();
        } , 1200);
      } else {
        Swal('Error', this.validarService.validarError(data), 'error');
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }
  }

  minuto(value){
    let resp;
    return resp = ((Math.floor(value / 60) != 0) && (Math.floor(value / 60) < 10) ? '0'+Math.floor(value / 60) : Math.floor(value / 60))  + ":" + ((value % 60 < 10) ? '0'+value % 60 : value % 60);
  }

  atras(){
    this.btnVolver.emit();
  }

}
