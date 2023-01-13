import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//Servicios
import { ApiTtpService } from '../../../../servicios/api-ttp.service';
import { ReportesPorSerieService } from '../../../../servicios/reportes-por-serie.service';
import { ValidadorService } from '../../../../validador/validador.service';

//Interface
import { IOficina } from '../../../../interfaces/oficinas.interface';
import { IResumenDeOficina } from '../../../../interfaces/resumenDeOficina'

//Utilidades
import Swal from 'sweetalert2';
import { ValidarTransaccionService } from '../../../../servicios/validar-transaccion.service';

@Component({
  selector: 'app-resumen-de-oficina-tabla',
  templateUrl: './resumen-de-oficina-tabla.component.html',
  styleUrls: ['./resumen-de-oficina-tabla.component.css']
})
export class ResumenDeOficinaTablaComponent implements OnInit {
  @Output() getForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() informacionReporte: EventEmitter<any> = new EventEmitter<any>();
  rows_resumenDeOficina: IResumenDeOficina[] = [];
  rows_oficinas: IOficina[] = [];
  serie: string = '';
  fechaInicial: string = '';
  fechaFinal: string = '';
  horaInicial: string = '';
  horaFinal: string = '';
  horaInicial2: string = '';
  horaFinal2: string = '';
  intervalo: string = '';
  dias: string = '';
  oficina: string = '';
  serieDetalle: string = '';
  entreDias: string = '';
  entreHoras: string = '';
  diasIncluidos: string = '';
  totalTurnosEmitidos: string = '';
  totalTurnosNormal: string = '';
  totalTurnosTol: string = '';
  totalTurnosEspecial: string = '';
  totalTurnosTotal: string = '';
  totalTurnosPerdidos: string = '';
  totalTurnosPerdidosTol: string = '';
  totalTurnosGeneral: string = '';

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
    this.getForm.emit("");
    if(this.validadorService.rangoHoraPermitido(this.horaInicial, this.horaFinal) && this.validadorService.rangoFechaPermitido(this.fechaInicial, this.fechaFinal) && this.validadorService.rangoHoraPermitido(this.horaInicial2, this.horaFinal2)){
      let ioficina:IOficina = {
        usuario: localStorage.getItem("repousuario"),
        password: localStorage.getItem("repopassword"),
        id_usuario: Number(localStorage.getItem("repoid_usuario")),
        id_oficina: oficina,
        serie:this.serie,
        fechaMin:this.fechaInicial.split("-")[2] + "/" + this.fechaInicial.split("-")[1] + "/" + this.fechaInicial.split("-")[0],
        fechaMax:this.fechaFinal.split("-")[2] + "/" + this.fechaFinal.split("-")[1] + "/" + this.fechaFinal.split("-")[0],
        horaInicial:this.horaInicial,
        horaFinal:this.horaFinal,
        horaInicial2:this.horaInicial2,
        horaFinal2:this.horaFinal2,
        intervalo:this.intervalo,
        dias:this.dias,
      };
      /* this.reportesPorSerieService.resumenDeOficina(ioficina).subscribe(data =>{
        if (!data["data"].includes("999")) {
          this.informacionReporte.emit(data["data"].substring(14, data["data"].length - 5));
        } else {
          Swal('Alerta', 'Sin información disponible', 'error');
        }
      }); */
      let data = await this.reportesPorSerieService.resumenDeOficina(ioficina);
      if (data['data'] == '' || data['data'] == undefined) {
        Swal('Error', 'Se ha producido un error.', 'error');
      } else {
        if (this.validarService.validarError(data) == 'ok') {
          this.informacionReporte.emit(data["data"].substring(14, data["data"].length - 5));
        } else {
          if (data["data"].includes("999")) {
            Swal('Alerta', 'Sin información disponible', 'error');
          } else {
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
    if(this.validadorService.rangoHoraPermitido(this.horaInicial, this.horaFinal) && this.validadorService.rangoFechaPermitido(this.fechaInicial, this.fechaFinal) && this.validadorService.rangoHoraPermitido(this.horaInicial2, this.horaFinal2)){
      let ioficina:IOficina = {
        usuario: localStorage.getItem("repousuario"),
        password: localStorage.getItem("repopassword"),
        id_usuario: Number(localStorage.getItem("repoid_usuario")),
        id_oficina: oficina,
        serie:this.serie,
        fechaMin:this.fechaInicial.split("-")[2] + "/" + this.fechaInicial.split("-")[1] + "/" + this.fechaInicial.split("-")[0],
        fechaMax:this.fechaFinal.split("-")[2] + "/" + this.fechaFinal.split("-")[1] + "/" + this.fechaFinal.split("-")[0],
        horaInicial:this.horaInicial,
        horaFinal:this.horaFinal,
        horaInicial2:this.horaInicial2,
        horaFinal2:this.horaFinal2,
        intervalo:this.intervalo,
        dias:this.dias,
      };
      /* this.reportesPorSerieService.resumenDeOficina(ioficina).subscribe(data =>{
        this.rows_resumenDeOficina.length = 0;
        if (!data["data"].includes("999")) {
          data["data"] = data["data"].substring(14, data["data"].length - 5)
          let encabezado = data["data"].split("|")[0].split("~");
          this.oficina = encabezado[0];
          this.serieDetalle = encabezado[1];
          this.entreDias = encabezado[2].split("-")[2] + "/" + encabezado[2].split("-")[1]+ "/" + encabezado[2].split("-")[0] + " y " + encabezado[3].split("-")[2] + "/" + encabezado[3].split("-")[1] + "/" +encabezado[3].split("-")[0];
          this.entreHoras = encabezado[4] + " Hrs. a " + encabezado[5] + " Hrs. y " + encabezado[6] + " a " + encabezado[7] + " Hrs.";
          this.diasIncluidos = encabezado[8];
          for(let i=1;i<(data["data"].split("|").length - 1);i++){
            let registros = data["data"].split("|")[i].split("~");
            let iResumenDeOficina = {
              // hora:registros[0],
              // turnosEmitidos:registros[1],
              // normal:registros[2],
              // tol:registros[3],
              // especial:registros[4],
              // total:registros[5],
              // turnosPerdidos:registros[6],
              // turnosPerdidosTol:registros[7]
              hora:registros[0],
              turnosEmitidos:registros[1],
              normal:registros[2],
              tol:registros[2],
              especial:registros[3],
              total:registros[4],
              turnosPerdidos:registros[5],
              turnosPerdidosTol:registros[6]
            };
            this.rows_resumenDeOficina.push(iResumenDeOficina);
          }
          this.totalTurnosEmitidos = data["data"].split("|")[data["data"].split("|").length - 1].split("~")[1];
          this.totalTurnosNormal = data["data"].split("|")[data["data"].split("|").length - 1].split("~")[2];
          this.totalTurnosTol = data["data"].split("|")[data["data"].split("|").length - 1].split("~")[3];
          this.totalTurnosEspecial = data["data"].split("|")[data["data"].split("|").length - 1].split("~")[4];
          this.totalTurnosTotal = data["data"].split("|")[data["data"].split("|").length - 1].split("~")[5];
          this.totalTurnosPerdidos = data["data"].split("|")[data["data"].split("|").length - 1].split("~")[6];
          this.totalTurnosPerdidosTol = data["data"].split("|")[data["data"].split("|").length - 1].split("~")[7];
          this.totalTurnosGeneral = data["data"].split("|")[data["data"].split("|").length - 1].split("~")[8];
          setTimeout(function(){
            let tmpElemento = document.createElement('a');
            let data_type = 'data:application/vnd.ms-excel;charset=UTF-8;';
            let tabla_div = document.getElementById('divReporte');
            let tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
            tmpElemento.href = data_type + ', ' + tabla_html;
            tmpElemento.download = 'resumenDeOficina.xls';
            tmpElemento.click();
          }, 1000);
        }
        else{
          Swal('Alerta', 'Rango de fechas no validos', 'error');
        }
      }); */

      let data = await this.reportesPorSerieService.resumenDeOficina(ioficina);
      if (data['data'] == '' || data['data'] == undefined) {
        Swal('Error', 'Se ha producido un error.', 'error');
      } else {
        if (this.validarService.validarError(data) == 'ok') {
          data["data"] = data["data"].substring(14, data["data"].length - 5)
          let encabezado = data["data"].split("|")[0].split("~");
          this.oficina = encabezado[0];
          this.serieDetalle = encabezado[1];
          this.entreDias = encabezado[2].split("-")[2] + "/" + encabezado[2].split("-")[1]+ "/" + encabezado[2].split("-")[0] + " y " + encabezado[3].split("-")[2] + "/" + encabezado[3].split("-")[1] + "/" +encabezado[3].split("-")[0];
          this.entreHoras = encabezado[4] + " Hrs. a " + encabezado[5] + " Hrs. y " + encabezado[6] + " a " + encabezado[7] + " Hrs.";
          this.diasIncluidos = encabezado[8];
          for(let i=1;i<(data["data"].split("|").length - 1);i++){
            let registros = data["data"].split("|")[i].split("~");
            let iResumenDeOficina = {
              // hora:registros[0],
              // turnosEmitidos:registros[1],
              // normal:registros[2],
              // tol:registros[3],
              // especial:registros[4],
              // total:registros[5],
              // turnosPerdidos:registros[6],
              // turnosPerdidosTol:registros[7]
              hora:registros[0],
              turnosEmitidos:registros[1],
              normal:registros[2],
              tol:registros[2],
              especial:registros[3],
              total:registros[4],
              turnosPerdidos:registros[5],
              turnosPerdidosTol:registros[6]
            };
            this.rows_resumenDeOficina.push(iResumenDeOficina);
          }
          this.totalTurnosEmitidos = data["data"].split("|")[data["data"].split("|").length - 1].split("~")[1];
          this.totalTurnosNormal = data["data"].split("|")[data["data"].split("|").length - 1].split("~")[2];
          this.totalTurnosTol = data["data"].split("|")[data["data"].split("|").length - 1].split("~")[3];
          this.totalTurnosEspecial = data["data"].split("|")[data["data"].split("|").length - 1].split("~")[4];
          this.totalTurnosTotal = data["data"].split("|")[data["data"].split("|").length - 1].split("~")[5];
          this.totalTurnosPerdidos = data["data"].split("|")[data["data"].split("|").length - 1].split("~")[6];
          this.totalTurnosPerdidosTol = data["data"].split("|")[data["data"].split("|").length - 1].split("~")[7];
          this.totalTurnosGeneral = data["data"].split("|")[data["data"].split("|").length - 1].split("~")[8];
          setTimeout(function(){
            let tmpElemento = document.createElement('a');
            let data_type = 'data:application/vnd.ms-excel;charset=UTF-8;';
            let tabla_div = document.getElementById('divReporte');
            let tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
            tmpElemento.href = data_type + ', ' + tabla_html;
            tmpElemento.download = 'resumenDeOficina.xls';
            tmpElemento.click();
          }, 1000);
        } else {
          if (data["data"].includes("999")) {
            Swal('Alerta', 'Rango de fechas no validos', 'error');
          } else {
            Swal('Error', this.validarService.validarError(data), 'error');
          }
        }
      }
    }
    else{
      Swal('Alerta', 'Rango de fecha/hora no validos', 'error');
    }
  }

}
