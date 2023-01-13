import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//Servicios
import { ApiTtpService } from '../../../../servicios/api-ttp.service';
import { ValidadorService } from '../../../../validador/validador.service';
import { ReportesPorSerieService } from '../../../../servicios/reportes-por-serie.service';

//Interface
import { IOficina } from '../../../../interfaces/oficinas.interface';
import { IAgrupacionesReportes } from '../../../../interfaces/agrupacionesReportes';

//Utilidades
import Swal from 'sweetalert2';
import { ValidarTransaccionService } from '../../../../servicios/validar-transaccion.service';

@Component({
  selector: 'app-motivos-de-atencion-tabla',
  templateUrl: './motivos-de-atencion-tabla.component.html',
  styleUrls: ['./motivos-de-atencion-tabla.component.css']
})
export class MotivosDeAtencionTablaComponent implements OnInit {
  @Output() getForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() informacionReporte: EventEmitter<any> = new EventEmitter<any>();
  @Output() informacionGrafico: EventEmitter<any> = new EventEmitter<any>();
  rows_oficinas: IOficina[] = [];
  serie: string = '';
  fechaMin: string='';
  fechaMax: string='';

  rows_agrupacionesReportes: IAgrupacionesReportes[] = [];
  titulo: string = '';
  serieDetalle: string = '';
  rangoFecha: string = '';

  constructor(private apiTtpService: ApiTtpService,
              private validadorService: ValidadorService,
              private reportePorSerieService: ReportesPorSerieService,
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
    if(this.validadorService.rangoFechaPermitido(this.fechaMin, this.fechaMax)){
      let ioficina:IOficina = {
        usuario: localStorage.getItem("repousuario"),
        password: localStorage.getItem("repopassword"),
        id_usuario: Number(localStorage.getItem("repoid_usuario")),
        id_oficina: oficina,
        serie:this.serie,
        fechaMin:this.fechaMin.split("-")[2] + "/" + this.fechaMin.split("-")[1] + "/" + this.fechaMin.split("-")[0],
        fechaMax:this.fechaMax.split("-")[2] + "/" + this.fechaMax.split("-")[1] + "/" + this.fechaMax.split("-")[0],
      };
      /* this.reportePorSerieService.motivosDeAtencion(ioficina).subscribe(data => {
        if (!data["data"].includes("999")) {
          this.informacionReporte.emit(data["data"].substring(14, data["data"].length - 5));
        } else {
          Swal('Alerta', 'Sin información disponible', 'error');
        }
      }); */
      let data = await this.reportePorSerieService.motivosDeAtencion(ioficina);
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
      Swal('Alerta', 'Rango de fechas no validos', 'error');
    }
  }

  async generarExcel(oficina){
    this.getForm.emit("");
    if(this.validadorService.rangoFechaPermitido(this.fechaMin, this.fechaMax)){
      let ioficina:IOficina = {
        usuario: localStorage.getItem("repousuario"),
        password: localStorage.getItem("repopassword"),
        id_usuario: Number(localStorage.getItem("repoid_usuario")),
        id_oficina: oficina,
        serie:this.serie,
        fechaMin:this.fechaMin.split("-")[2] + "/" + this.fechaMin.split("-")[1] + "/" + this.fechaMin.split("-")[0],
        fechaMax:this.fechaMax.split("-")[2] + "/" + this.fechaMax.split("-")[1] + "/" + this.fechaMax.split("-")[0],
      };
      /* this.reportePorSerieService.motivosDeAtencion(ioficina).subscribe(data => {
        if (!data["data"].includes("999")) {
          let registros = data["data"].substring(14, data["data"].length - 5);
          this.rows_agrupacionesReportes.length = 0;
          this.titulo = registros.split("|")[0].split("~")[0];
          this.serieDetalle = registros.split("|")[0].split("~")[1];
          this.rangoFecha = registros.split("|")[0].split("~")[2] + " y " + registros.split("|")[0].split("~")[3];
          for(let i=1;i<registros.split("|").length;i++){
            let datos = registros.split("|")[i].split("~");
            let iAgrupacionesReportes:IAgrupacionesReportes = {
              detalle:datos[1],
              conteo:datos[2],
              suma:datos[3]
            };
            this.rows_agrupacionesReportes.push(iAgrupacionesReportes);
          }

          setTimeout(function(){
            let tmpElemento = document.createElement('a');
            let data_type = 'data:application/vnd.ms-excel;charset=UTF-8;';
            let tabla_div = document.getElementById('divReporte');
            let tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
            tmpElemento.href = data_type + ', ' + tabla_html;
            tmpElemento.download = 'MotivosDeAtencion.xls';
            tmpElemento.click();
          }, 1000);
        } else {
          Swal('Alerta', 'Sin información disponible', 'error');
        }
      }); */

      let data = await this.reportePorSerieService.motivosDeAtencion(ioficina);
      if (data['data'] == '' || data['data'] == undefined) {
        Swal('Error', 'Se ha producido un error.', 'error');
      } else {
        if (this.validarService.validarError(data) == 'ok') {
          let registros = data["data"].substring(14, data["data"].length - 5);
          this.rows_agrupacionesReportes.length = 0;
          this.titulo = registros.split("|")[0].split("~")[0];
          this.serieDetalle = registros.split("|")[0].split("~")[1];
          this.rangoFecha = registros.split("|")[0].split("~")[2] + " y " + registros.split("|")[0].split("~")[3];
          for(let i=1;i<registros.split("|").length;i++){
            let datos = registros.split("|")[i].split("~");
            let iAgrupacionesReportes:IAgrupacionesReportes = {
              detalle:datos[1],
              conteo:datos[2],
              suma:datos[3]
            };
            this.rows_agrupacionesReportes.push(iAgrupacionesReportes);
          }

          setTimeout(function(){
            let tmpElemento = document.createElement('a');
            let data_type = 'data:application/vnd.ms-excel;charset=UTF-8;';
            let tabla_div = document.getElementById('divReporte');
            let tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
            tmpElemento.href = data_type + ', ' + tabla_html;
            tmpElemento.download = 'MotivosDeAtencion.xls';
            tmpElemento.click();
          }, 1000);
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
      Swal('Alerta', 'Rango de fechas no validos', 'error');
    }
  }

  async mostrarGrafico(oficina){
    this.getForm.emit("");
    if(this.validadorService.rangoFechaPermitido(this.fechaMin, this.fechaMax)){
      let ioficina:IOficina = {
        usuario: localStorage.getItem("repousuario"),
        password: localStorage.getItem("repopassword"),
        id_usuario: Number(localStorage.getItem("repoid_usuario")),
        id_oficina: oficina,
        serie:this.serie,
        fechaMin:this.fechaMin.split("-")[2] + "/" + this.fechaMin.split("-")[1] + "/" + this.fechaMin.split("-")[0],
        fechaMax:this.fechaMax.split("-")[2] + "/" + this.fechaMax.split("-")[1] + "/" + this.fechaMax.split("-")[0],
      };
      /* this.reportePorSerieService.motivosDeAtencion(ioficina).subscribe(data => {
        if (!data["data"].includes("999")) {
          this.informacionGrafico.emit(data["data"].substring(14, data["data"].length - 5));
        }
        else{
          Swal('Alerta', 'Rango de fechas no validos', 'error');
        }
      }); */

      let data = await this.reportePorSerieService.motivosDeAtencion(ioficina);
      if (data['data'] == '' || data['data'] == undefined) {
        Swal('Error', 'Se ha producido un error.', 'error');
      } else {
        if (this.validarService.validarError(data) == 'ok') {
          this.informacionGrafico.emit(data["data"].substring(14, data["data"].length - 5));
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
      Swal('Alerta', 'Rango de fechas no validos', 'error');
    }
  }

}
