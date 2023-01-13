import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//Servicios
import { ApiTtpService } from '../../../../servicios/api-ttp.service';
import { ReportesPorSerieService } from '../../../../servicios/reportes-por-serie.service';
import { ValidadorService } from '../../../../validador/validador.service';

//Interface
import { IOficina } from '../../../../interfaces/oficinas.interface';
import { ICargaDeTrabajoDiaria } from '../../../../interfaces/cargaDeTrabajoDiaria';

//Utilidades
import Swal from 'sweetalert2';
import { ValidarTransaccionService } from '../../../../servicios/validar-transaccion.service';

@Component({
  selector: 'app-carga-de-trabajo-diaria-tabla',
  templateUrl: './carga-de-trabajo-diaria-tabla.component.html',
  styleUrls: ['./carga-de-trabajo-diaria-tabla.component.css']
})
export class CargaDeTrabajoDiariaTablaComponent implements OnInit {
  fecha:string;
  horaInicial:string;
  horaFinal:string;
  intervalo:string;
  serie:string;
  rows_oficinas: IOficina[] = [];
  @Output() getForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() informacionReporte: EventEmitter<any> = new EventEmitter<any>();
  @Output() informacionGrafico: EventEmitter<any> = new EventEmitter<any>();
  rows_cargaDeTrabajoDiaria: ICargaDeTrabajoDiaria[] = [];

  titulo: string = '';
  serieDetalle:string = '';
  rangoFecha: string = '';

  totalTurnosEmitidos: string = '';
  totalNormal: string = '';
  totalTOL: string = '';
  totalEspecial: string = '';
  totalTurnosPerdidos: string = '';
  totalTurnosPerdidosTOL: string = '';
  totalGeneral: string = '';

  constructor(private apiTtpService: ApiTtpService,
              private validadorService: ValidadorService,
              private reportesPorSerieService: ReportesPorSerieService,
              private validarService: ValidarTransaccionService) { }

  async ngOnInit() {
    await this.cargarDatos();
  }

  async cargarDatos() {
    this.apiTtpService.id_usuario = localStorage.getItem("repoid_usuario");
    this.apiTtpService.user = localStorage.getItem("repousuario");
    this.apiTtpService.pass_usuario = localStorage.getItem("repopassword");
    /* this.apiTtpService.obtener_oficinas().subscribe(res =>{
      let registros = res["data"].substring(14, res["data"].length - 5).split("|");
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
        let registros = data['data'].substring(14, data['data'].length - 5).split('|');
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
    this.getForm.emit("");
    if(this.validadorService.rangoHoraPermitido(this.horaInicial, this.horaFinal)){
      let ioficina: IOficina = {
        usuario: localStorage.getItem("repousuario"),
        password: localStorage.getItem("repopassword"),
        id_usuario: Number(localStorage.getItem("repoid_usuario")),
        id_oficina:oficina,
        fecha:this.fecha.split("-")[2] + "/" + this.fecha.split("-")[1] + "/" + this.fecha.split("-")[0],
        horaInicial:this.horaInicial,
        horaFinal:this.horaFinal,
        intervalo:this.intervalo,
        serie:this.serie
      }
      /* this.reportesPorSerieService.cargaDeTrabajoDiaria(ioficina).subscribe(data =>{
        if (!data["data"].includes("999")) {
          this.informacionReporte.emit(data["data"].substring(14, data["data"].length - 5));
        } else {
          Swal('Alerta', 'Sin información disponible', 'error');
        }
      }); */
      let data = await this.reportesPorSerieService.cargaDeTrabajoDiaria(ioficina);
      if (data['data'] == '' || data['data'] == undefined) {
        Swal('Error', 'Se ha producido un error.', 'error');
      } else {
        if (this.validarService.validarError(data) == 'ok') {
          this.informacionReporte.emit(data["data"].substring(14, data["data"].length - 5));
        } else {
          if (data["data"].includes("999")) {
            Swal('Alerta', 'Sin información disponible', 'error');
          } else{
            Swal('Error', this.validarService.validarError(data), 'error');
          }
        }
      }
    }
    else{
      Swal('Alerta', 'Rango de hora no validos', 'error');
    }
  }

  async generarExcel(oficina){
    this.getForm.emit("");
    if(this.validadorService.rangoHoraPermitido(this.horaInicial, this.horaFinal)){
      let ioficina: IOficina = {
        usuario: localStorage.getItem("repousuario"),
        password: localStorage.getItem("repopassword"),
        id_usuario: Number(localStorage.getItem("repoid_usuario")),
        id_oficina:oficina,
        fecha:this.fecha.split("-")[2] + "/" + this.fecha.split("-")[1] + "/" + this.fecha.split("-")[0],
        horaInicial:this.horaInicial,
        horaFinal:this.horaFinal,
        intervalo:this.intervalo,
        serie:this.serie
      }
      /* this.reportesPorSerieService.cargaDeTrabajoDiaria(ioficina).subscribe(data =>{
        this.rows_cargaDeTrabajoDiaria.length = 0;
        if (!data["data"].includes("999")) {
          let registros = data["data"].substring(14, data["data"].length - 5).split("|");
          this.titulo = registros[0].split("~")[0];
          this.serieDetalle = registros[0].split("~")[1];
          this.rangoFecha = registros[0].split("~")[2];
          for(let i=1; i<(registros.length) - 1;i++){
            let registro = registros[i].split("~");
            let iCargaDeTrabajoDiaria:ICargaDeTrabajoDiaria = {
              hora: registro[0],
              turnosEmitidos:registro[1],
              turnosAtendidosNormal:registro[2],
              turnosAtendidosTOL:registro[3],
              turnosAtendidosEspecial:registro[3],
              turnosPerdidos:registro[4],
              turnosPerdidosTOL:registro[4],
              ejecutivosActivos:registro[5],
              esperaMedia:this.secondsToHms(registro[6]),
              deltaEsperaMedia:registro[6]
              // hora: registro[0],
              // turnosEmitidos:registro[1],
              // turnosAtendidosNormal:registro[2],
              // turnosAtendidosTOL:registro[3],
              // turnosAtendidosEspecial:registro[4],
              // turnosPerdidos:registro[5],
              // turnosPerdidosTOL:registro[6],
              // ejecutivosActivos:registro[7],
              // esperaMedia:this.secondsToHms(registro[8]),
              // deltaEsperaMedia:registro[9]
            };
            this.rows_cargaDeTrabajoDiaria.push(iCargaDeTrabajoDiaria);
          }
          this.totalTurnosEmitidos = registros[(registros.length) - 1].split("~")[1];
          this.totalNormal = registros[(registros.length) - 1].split("~")[2];
          this.totalTOL = registros[(registros.length) - 1].split("~")[3];
          this.totalEspecial = registros[(registros.length) - 1].split("~")[4];
          this.totalTurnosPerdidos = registros[(registros.length) - 1].split("~")[5];
          this.totalTurnosPerdidosTOL = registros[(registros.length) - 1].split("~")[6];
          this.totalGeneral = registros[(registros.length) - 1].split("~")[7];
          setTimeout(function(){
            let tmpElemento = document.createElement('a');
            let data_type = 'data:application/vnd.ms-excel;charset=UTF-8;';
            let tabla_div = document.getElementById('divReporte');
            let tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
            tmpElemento.href = data_type + ', ' + tabla_html;
            tmpElemento.download = 'cargaDeTrabajoDiariaReporte.xls';
            tmpElemento.click();
          }, 1000);
        } else {
          Swal('Alerta', 'Sin información disponible', 'error');
        }
      }); */
      let data = await this.reportesPorSerieService.cargaDeTrabajoDiaria(ioficina);
      if (data['data'] == '' || data['data'] == undefined) {
        Swal('Error', 'Se ha producido un error.', 'error');
      } else {
        if (this.validarService.validarError(data) == 'ok') {
          this.rows_cargaDeTrabajoDiaria.length = 0;
          let registros = data["data"].substring(14, data["data"].length - 5).split("|");
          this.titulo = registros[0].split("~")[0];
          this.serieDetalle = registros[0].split("~")[1];
          this.rangoFecha = registros[0].split("~")[2];
          for(let i=1; i<(registros.length) - 1;i++){
            let registro = registros[i].split("~");
            let iCargaDeTrabajoDiaria:ICargaDeTrabajoDiaria = {
              hora: registro[0],
              turnosEmitidos:registro[1],
              turnosAtendidosNormal:registro[2],
              turnosAtendidosTOL:registro[3],
              turnosAtendidosEspecial:registro[3],
              turnosPerdidos:registro[4],
              turnosPerdidosTOL:registro[4],
              ejecutivosActivos:registro[5],
              esperaMedia:this.secondsToHms(registro[6]),
              deltaEsperaMedia:registro[6]
              // hora: registro[0],
              // turnosEmitidos:registro[1],
              // turnosAtendidosNormal:registro[2],
              // turnosAtendidosTOL:registro[3],
              // turnosAtendidosEspecial:registro[4],
              // turnosPerdidos:registro[5],
              // turnosPerdidosTOL:registro[6],
              // ejecutivosActivos:registro[7],
              // esperaMedia:this.secondsToHms(registro[8]),
              // deltaEsperaMedia:registro[9]
            };
            this.rows_cargaDeTrabajoDiaria.push(iCargaDeTrabajoDiaria);
          }
          this.totalTurnosEmitidos = registros[(registros.length) - 1].split("~")[1];
          this.totalNormal = registros[(registros.length) - 1].split("~")[2];
          this.totalTOL = registros[(registros.length) - 1].split("~")[3];
          this.totalEspecial = registros[(registros.length) - 1].split("~")[4];
          this.totalTurnosPerdidos = registros[(registros.length) - 1].split("~")[5];
          this.totalTurnosPerdidosTOL = registros[(registros.length) - 1].split("~")[6];
          this.totalGeneral = registros[(registros.length) - 1].split("~")[7];
          setTimeout(function(){
            let tmpElemento = document.createElement('a');
            let data_type = 'data:application/vnd.ms-excel;charset=UTF-8;';
            let tabla_div = document.getElementById('divReporte');
            let tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
            tmpElemento.href = data_type + ', ' + tabla_html;
            tmpElemento.download = 'cargaDeTrabajoDiariaReporte.xls';
            tmpElemento.click();
          }, 1000);
        } else {
          if (data["data"].includes("999")) {
            Swal('Alerta', 'Sin información disponible', 'error');
          } else{
            Swal('Error', this.validarService.validarError(data), 'error');
          }
        }
      }
    }
    else{
      Swal('Alerta', 'Rango de hora no validos', 'error');
    }
  }

  async mostrarGrafico(oficina){
    this.getForm.emit("");
    if(this.validadorService.rangoHoraPermitido(this.horaInicial, this.horaFinal)){
      let ioficina: IOficina = {
        usuario: localStorage.getItem("repousuario"),
        password: localStorage.getItem("repopassword"),
        id_usuario: Number(localStorage.getItem("repoid_usuario")),
        id_oficina:oficina,
        fecha:this.fecha.split("-")[2] + "/" + this.fecha.split("-")[1] + "/" + this.fecha.split("-")[0],
        horaInicial:this.horaInicial,
        horaFinal:this.horaFinal,
        intervalo:this.intervalo,
        serie:this.serie
      }
      /* this.reportesPorSerieService.cargaDeTrabajoDiaria(ioficina).subscribe(data =>{
        if (!data["data"].includes("999")) {
          this.informacionGrafico.emit(data["data"].substring(14, data["data"].length - 5));
        }
        else{
          Swal('Alerta', 'Sin informacion disponible', 'error');
        }
      }); */
      let data = await this.reportesPorSerieService.cargaDeTrabajoDiaria(ioficina);
      if (data['data'] == '' || data['data'] == undefined) {
        Swal('Error', 'Se ha producido un error.', 'error');
      } else {
        if (this.validarService.validarError(data) == 'ok') {
          this.informacionGrafico.emit(data["data"].substring(14, data["data"].length - 5));
        } else {
          if (data["data"].includes("999")) {
            Swal('Alerta', 'Sin información disponible', 'error');
          } else{
            Swal('Error', this.validarService.validarError(data), 'error');
          }
        }
      }
    }
    else{
      Swal('Alerta', 'Rango de hora no validos', 'error');
    }
  }

  secondsToHms(d = 0) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h : "00";
    var mDisplay = m > 0 ? m : "00";
    var sDisplay = s > 0 ? s : "00";

    return (String(hDisplay) + ":" + String(mDisplay) + ":" + String(sDisplay) == "00:00:00") ? "" : String(hDisplay) + ":" + String(mDisplay) + ":" + String(sDisplay);
  }
}
