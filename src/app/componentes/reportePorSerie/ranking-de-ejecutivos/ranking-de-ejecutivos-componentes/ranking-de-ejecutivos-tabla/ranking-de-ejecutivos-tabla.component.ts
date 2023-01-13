import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//Servicios
import { ApiTtpService } from '../../../../../servicios/api-ttp.service';
import { ValidadorService } from '../../../../../validador/validador.service';

//Utilidades
import Swal from 'sweetalert2';
import { ValidarTransaccionService } from '../../../../../servicios/validar-transaccion.service';

const EXCEL_EXTENSION = '.xls';
const EXCEL_TYPE = 'data:application/vnd.ms-excel;charset=UTF-8;';

@Component({
  selector: 'app-ranking-de-ejecutivos-tabla',
  templateUrl: './ranking-de-ejecutivos-tabla.component.html',
  styleUrls: ['./ranking-de-ejecutivos-tabla.component.css']
})
export class RankingDeEjecutivosTablaComponent implements OnInit {
  @Output() informacionReporte: EventEmitter<any> = new EventEmitter<any>();

  oficinas:any[] = [];
  consulta:any[] = [];
  serie:string = "";

  //Informe
  datos:any[] = [];
  titulo:any[] = [];
  superior:any[] = [];

  constructor(private _api: ApiTtpService, private validadorService: ValidadorService, private validarService: ValidarTransaccionService) {
  }

  async ngOnInit() {
    await this.obtener_oficinas();
  }

  async obtener_oficinas() {
    /* this._api.obtener_oficinas().subscribe( data=>{
      let registros = data["data"].substring(14, data["data"].length - 5).split("|");
      for (let index = 0; index < registros.length; index++) {
        let campos = registros[index].split("~");
        this.oficinas.push({"id":campos[0], "oficina": campos[1], "thecheck":false, "fechamin": campos[2], "fechamax": campos[3]});
      }
    }) */
    let data = await this._api.obtener_oficinas();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      if (this.validarService.validarError(data) == 'ok') {
        let registros = data["data"].substring(14, data["data"].length - 5).split("|");
        for (let index = 0; index < registros.length; index++) {
          let campos = registros[index].split("~");
          this.oficinas.push({"id":campos[0], "oficina": campos[1], "thecheck":false, "fechamin": campos[2], "fechamax": campos[3]});
        }
      } else {
        Swal('Error', this.validarService.validarError(data), 'error');
      }
    }
  }

  async enviar(oficina){
    if (this.consulta != []) {
      if (this.serie) { console.log(this.consulta); console.log(this.consulta['diaI']);
        if(this.validadorService.rangoFechaPermitido(this.consulta['diaI'], this.consulta['diaF'])){
          this._api.datos_rps_rankingEjecutivo(this.consulta, this.serie, oficina);
          /* this._api.reportePorSerie_RankingEjecutivo().subscribe( data=>{
            if (!data.data.includes("999")) {
              let str:string;
              str = data.data;
              let registros = str.substring(14, str.length - 5).split("|");
              this.informacionReporte.emit(registros);
            } else {
              Swal('Alerta', 'Sin información disponible', 'error');
            }
          }); */

          let data = await this._api.reportePorSerie_RankingEjecutivo();
          if (data['data'] == '' || data['data'] == undefined) {
            Swal('Error', 'Se ha producido un error.', 'error');
          } else {
            if (this.validarService.validarError(data) == 'ok') {
              let str:string;
              str = data.data;
              let registros = str.substring(14, str.length - 5).split("|");
              this.informacionReporte.emit(registros);
            } else {
              if(data.data.includes("999")) {
                Swal('Alerta', 'Sin información disponible', 'error');
              } else {
                Swal('Error', this.validarService.validarError(data), 'error');
              }
            }
          }
        } else{
          Swal('Alerta', 'Rango de fecha no validos', 'error');
        }
      } else {
        Swal('Error', 'Favor Seleccione una Serie', 'error');
      }
    } else {
      Swal('Error', 'Verifique los Parametros', 'error');
    }
  }

  async excel(oficina){
    if (this.serie && oficina) {
      if (this.consulta != []) {
        if(this.validadorService.rangoFechaPermitido(this.consulta['diaI'], this.consulta['diaF'])){
          this._api.datos_rps_rankingEjecutivo(this.consulta, this.serie, oficina);
          /* this._api.reportePorSerie_RankingEjecutivo().subscribe( data=>{
            if (data.data == "error login") {
              Swal('Error', 'Error Login', 'error');
            } else {
              let str:string;
              str = data.data;
              let registros = str.substring(14, str.length - 5).split("|");
              for (let index = 0; index < registros.length; index++) {
                let campos = registros[index].split("~");
                if (index == 0) {
                  this.superior = campos;
                } else {
                  this.datos.push({"rank":campos[0], "ejecutivo": campos[1], "ate":campos[2], "tpo_m": this.minuto(campos[3]), "on_off": campos[4]});
                }
              }
              var tmpElemento = document.createElement('a');
              setTimeout(() => {
                var tabla_div = document.getElementById('divReporte');
                var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
                tmpElemento.href = EXCEL_TYPE + ', ' + tabla_html;
                tmpElemento.download = 'Ranking_de_Ejecutivo_' + new Date().getTime() + EXCEL_EXTENSION;
                tmpElemento.click();
              } , 1200);
            }
          }); */

          let data = await this._api.reportePorSerie_RankingEjecutivo();
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
                  this.datos.push({"rank":campos[0], "ejecutivo": campos[1], "ate":campos[2], "tpo_m": this.minuto(campos[3]), "on_off": campos[4]});
                }
              }
              var tmpElemento = document.createElement('a');
              setTimeout(() => {
                var tabla_div = document.getElementById('divReporte');
                var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
                tmpElemento.href = EXCEL_TYPE + ', ' + tabla_html;
                tmpElemento.download = 'Ranking_de_Ejecutivo_' + new Date().getTime() + EXCEL_EXTENSION;
                tmpElemento.click();
              } , 1200);
            } else {
              Swal('Error', this.validarService.validarError(data), 'error');
            }
          }
        } else{
          Swal('Alerta', 'Rango de fecha no validos', 'error');
        }
      } else {
        Swal('Error', 'Error en Parametros', 'error');
      }
    } else {
      Swal('Error', 'Favor Seleccione Series y/o Oficinas', 'error');
    }
  }

  minuto(value){
    let resp;
    return resp = (Math.floor(value / 60) != 0 || Math.floor(value / 60) < 10 ? '0'+Math.floor(value / 60) : Math.floor(value / 60))  + ":" + ((value % 60 < 10) ? '0'+value % 60 : value % 60);
  }

}
