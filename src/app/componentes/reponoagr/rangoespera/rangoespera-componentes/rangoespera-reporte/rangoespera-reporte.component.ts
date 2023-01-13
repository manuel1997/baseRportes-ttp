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
  selector: 'app-rangoespera-reporte',
  templateUrl: './rangoespera-reporte.component.html',
  styleUrls: ['./rangoespera-reporte.component.css']
})
export class RangoesperaReporteComponent implements OnInit {
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

  async mostrarReporte(){
    this.datos.length = 0;
    this.superior.length = 0;

    let data = await this._api.rgnoa_rangoespera();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      let resultado = this.validarService.validarError(data);
      if(resultado == 'ok') {
      // if (data.data == "error login" || data.data.includes("999")) {
        let str:string;
        str = data.data;
        let registros = str.substring(14, str.length - 5).split("|");
        for (let index = 0; index < registros.length; index++) {
          let campos = registros[index].split("~");
          if (index == 0) {
            this.superior = campos;
          } else {
            if (campos[1] == 'TOT') {
              campos[1] = 'Totales';
            }
            this.datos.push({
              "oficina":campos[1],
              "serie": campos[2],
              "atendidos_n":campos[3],
              "atendidos_porcentaje": campos[4],
              "perdidos_n": campos[5],
              "perdidos_porcentaje": campos[6],
              "espera_promedio": this.minuto(campos[7]),
              "delta_espera": this.minuto(campos[8])
            });
          }
        }
      } else {
        Swal('Error', this.validarService.validarError(data), 'error');
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }
    this.gifCarga = false;
  }

  async generarExcel() {
    this.datos.length = 0;
    this.superior.length = 0;

    let data = await this._api.rgnoa_rangoespera();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      let resultado = this.validarService.validarError(data);
      if(resultado == 'ok'){
      //if (data.data == "error login" || data.data.includes("999")) {
        let str:string;
        str = data.data;
        let registros = str.substring(14, str.length - 5).split("|");
        for (let index = 0; index < registros.length; index++) {
          let campos = registros[index].split("~");
          if (index == 0) {
            this.superior = campos;
          } else {
            if (campos[1] == 'TOT') {
              campos[1] = 'Totales';
            }
            this.datos.push({
              "oficina":campos[1],
              "serie": campos[2],
              "atendidos_n":campos[3],
              "atendidos_porcentaje": campos[4],
              "perdidos_n": campos[5],
              "perdidos_porcentaje": campos[6],
              "espera_promedio": this.minuto(campos[7]),
              "delta_espera": this.minuto(campos[8])
          });
          }
        }
        var tmpElemento = document.createElement('a');
        setTimeout(() => {
          var tabla_div = document.getElementById('divReporte');
          var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
          tmpElemento.href = EXCEL_TYPE + ', ' + tabla_html;
          tmpElemento.download = 'Rango_Espera_' + new Date().getTime() + EXCEL_EXTENSION;
          tmpElemento.click();
        } , 1200);
      } else {
        Swal('Error', 'Error Login', 'error');
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
