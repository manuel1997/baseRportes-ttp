import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

//Servicios
import { ApiTtpService } from '../../../../../servicios/api-ttp.service';
import { AuthService } from '../../../../../servicios/auth.service';

//Utilidades
import Swal from 'sweetalert2';
import { ValidarTransaccionService } from '../../../../../servicios/validar-transaccion.service';
const EXCEL_EXTENSION = '.xls';
const EXCEL_TYPE = 'data:application/vnd.ms-excel;charset=UTF-8;';

@Component({
  selector: 'app-rankingdeatenciones-reporte',
  templateUrl: './rankingdeatenciones-reporte.component.html',
  styleUrls: ['./rankingdeatenciones-reporte.component.css']
})
export class RankingdeatencionesReporteComponent implements OnInit {
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

    let data = await this._api.rgnoa_noagrRankingAtencion();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      if (this.validarService.validarError(data) == 'ok') {
        let str:string;
        str = data.data;
        let registros = str.substring(14, str.length - 5).split("|");
        for (let index = 0; index < registros.length; index++) {
          let campos = registros[index].split("~");
          if (index == 0) {
            this.superior = campos;
          } else {
            this.datos.push({"oficina":campos[0], "serie": campos[1], "atendidos_n":campos[2], "atendidos_porcentaje": campos[3]});
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

  async generarExcel(){
    this.datos.length = 0;
    this.superior.length = 0;

    let data = await this._api.rgnoa_noagrRankingAtencion();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      if (this.validarService.validarError(data) == 'ok') {
        let str:string;
        str = data.data;
        let registros = str.substring(14, str.length - 5).split("|");
        for (let index = 0; index < registros.length; index++) {
          let campos = registros[index].split("~");
          if (index == 0) {
            this.superior = campos;
          } else {
            this.datos.push({"oficina":campos[0], "serie": campos[1], "atendidos_n":campos[2], "atendidos_porcentaje": campos[3]});
          }
        }
        var tmpElemento = document.createElement('a');
        setTimeout(() => {
          var tabla_div = document.getElementById('divReporte');
          var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
          tmpElemento.href = EXCEL_TYPE + ', ' + tabla_html;
          tmpElemento.download = 'Ranking_Atencion_' + new Date().getTime() + EXCEL_EXTENSION;
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
