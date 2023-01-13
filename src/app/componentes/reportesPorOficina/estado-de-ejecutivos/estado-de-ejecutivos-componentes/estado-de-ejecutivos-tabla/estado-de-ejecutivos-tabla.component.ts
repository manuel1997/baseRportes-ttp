import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//Servicios
import { ApiTtpService } from '../../../../../servicios/api-ttp.service';
import { ReportesPorOficinasService } from '../../../../../servicios/reportes-por-oficinas.service';
import { ValidadorService } from '../../../../../validador/validador.service';

//Interface
import { IOficina } from '../../../../../interfaces/oficinas.interface';
import { IAgrupacionesReportes } from '../../../../../interfaces/agrupacionesReportes';

//Utilidades
import Swal from 'sweetalert2';
import { ValidarTransaccionService } from '../../../../../servicios/validar-transaccion.service';

@Component({
  selector: 'app-estado-de-ejecutivos-tabla',
  templateUrl: './estado-de-ejecutivos-tabla.component.html',
  styleUrls: ['./estado-de-ejecutivos-tabla.component.css']
})
export class EstadoDeEjecutivosTablaComponent implements OnInit {
  @Output() getForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataReporte: EventEmitter<any> = new EventEmitter<any>();
  dia:string;
  intervalo:number = 30;
  horaInicial:number;
  horaFinal:number;
  tiempo:string[] = [];
  oficina:string = "";
  entreHoras:string = "";

  rows_oficinas: IOficina[] = [];
  rows_ejecutivos:IAgrupacionesReportes [] = [];
  rows_acciones:any [] = [];

  constructor(private apiTtpService:ApiTtpService,
              private reportesPorOficinasService:ReportesPorOficinasService,
              private validadorService:ValidadorService,
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
    let ioficina:IOficina = {
      usuario:null,
      password:null,
      id_oficina: null,
      fecha:null,
      horaInicial:null,
      horaFinal:null
    };
    ioficina.id_usuario = Number(localStorage.getItem("repoid_usuario"));
    ioficina.usuario = localStorage.getItem("repousuario");
    ioficina.password = localStorage.getItem("repopassword");
    ioficina.fecha = this.dia.split("-")[2] + "/" + this.dia.split("-")[1] + "/" + this.dia.split("-")[0];
    if(this.validadorService.rangoHoraPermitido(this.horaInicial, this.horaFinal)){
      ioficina.horaInicial = String(this.horaInicial);
      ioficina.horaFinal = String(this.horaFinal);
      ioficina.id_oficina = oficina;
      /* this.reportesPorOficinasService.estadoDeEjecutivos(ioficina).subscribe(data => {
        this.dataReporte.emit(data["data"].substring(14, data["data"].length - 5));
      }); */

      let data1 = await this.reportesPorOficinasService.estadoDeEjecutivos(ioficina);
      if (data1['data'] == '' || data1['data'] == undefined) {
        Swal('Error', 'Se ha producido un error.', 'error');
      } else {
        if (this.validarService.validarError(data1) == 'ok') {
          this.dataReporte.emit(data1["data"].substring(14, data1["data"].length - 5));
        } else {
          // Swal('Error', this.validarService.validarError(data1), 'error');
        }
      }
    }
    else{
      Swal('Alerta', 'Rango de hora no validos', 'error');
    }
  }

  async generarExcel(oficina){
    this.getForm.emit("");
    let ioficina:IOficina = {
      usuario:null,
      password:null,
      id_oficina: null,
      fecha:null,
      horaInicial:null,
      horaFinal:null
    };
    if(this.validadorService.rangoHoraPermitido(this.horaInicial, this.horaFinal)){
      ioficina.id_usuario = Number(localStorage.getItem("repoid_usuario"));
      ioficina.usuario = localStorage.getItem("repousuario");
      ioficina.password = localStorage.getItem("repopassword");
      ioficina.fecha = this.dia.split("-")[2] + "/" + this.dia.split("-")[1] + "/" + this.dia.split("-")[0];
      ioficina.horaInicial = String(this.horaInicial);
      ioficina.horaFinal = String(this.horaFinal);
      ioficina.id_oficina = oficina;
      /* this.reportesPorOficinasService.estadoDeEjecutivos(ioficina).subscribe(data => {
        let dataExcel = data["data"].substring(14, data["data"].length - 5);
        this.tiempo.length = 0;
        this.rows_ejecutivos.length = 0;
        this.rows_acciones.length = 0;
        for(let i = this.horaInicial;i<this.horaFinal;i++){
          for(let j=0;j<60;j+=Number(this.intervalo)){
            let hora = (i.toString().length == 1)? '0' + i : i;
            let minuto = (j.toString().length == 1)? '0' + j : j;
            this.tiempo.push(hora+":"+minuto);
          }
        }
        this.tiempo.push(this.horaFinal+":00");
        let registros = dataExcel.split("|");
        let encabezado = registros[0].split("~");
        this.oficina = encabezado[0];
        this.dia = encabezado[1];
        this.entreHoras = encabezado[2] + " Hrs. y " + encabezado[3] + " Hrs.";
        for(let i=1;i<registros.length;i++){
          let registro = registros[i].split("~");
          if(registro.length > 2){
            let agrupacionesReportes: IAgrupacionesReportes = {
              id:registro[0],
              conteo:0,
              detalle:registro[1]
            }
            this.rows_ejecutivos.push(agrupacionesReportes);
            let tiempo:any[] = [];
            for(let index in this.tiempo){
              tiempo.push({"hora":this.tiempo[index].replace(":",""), "tipo":null});
            }
            this.rows_acciones.push(tiempo);
            for(let m=2;m<registro.length;m+=2){
              for(let n =0; n<this.rows_acciones[i-1].length;n++){
                if(Number(this.rows_acciones[i-1][n]["hora"]) >= registro[m+1]){
                  this.rows_acciones[i-1][n]["tipo"] =  (registro[m] == "O")? "#ffffff":
                                                        (registro[m] == "P")? "#ff0000": "#00ff00";
                }
              }
            }
          }
        }
        setTimeout(function(){
          let tmpElemento = document.createElement('a');
          let data_type = 'data:application/vnd.ms-excel;charset=UTF-8;';
          let tabla_div = document.getElementById('divReporte');
          let tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
          tmpElemento.href = data_type + ', ' + tabla_html;
          tmpElemento.download = 'EstadoDeEjecutivos.xls';
          tmpElemento.click();
        }, 1000);
      }); */

      let data = await this.reportesPorOficinasService.estadoDeEjecutivos(ioficina);
      if (data['data'] == '' || data['data'] == undefined) {
        Swal('Error', 'Se ha producido un error.', 'error');
      } else {
        if (this.validarService.validarError(data) == 'ok') {
          let dataExcel = data["data"].substring(14, data["data"].length - 5);
          this.tiempo.length = 0;
          this.rows_ejecutivos.length = 0;
          this.rows_acciones.length = 0;
          for(let i = this.horaInicial;i<this.horaFinal;i++){
            for(let j=0;j<60;j+=Number(this.intervalo)){
              let hora = (i.toString().length == 1)? '0' + i : i;
              let minuto = (j.toString().length == 1)? '0' + j : j;
              this.tiempo.push(hora+":"+minuto);
            }
          }
          this.tiempo.push(this.horaFinal+":00");
          let registros = dataExcel.split("|");
          let encabezado = registros[0].split("~");
          this.oficina = encabezado[0];
          this.dia = encabezado[1];
          this.entreHoras = encabezado[2] + " Hrs. y " + encabezado[3] + " Hrs.";
          for(let i=1;i<registros.length;i++){
            let registro = registros[i].split("~");
            if(registro.length > 2){
              let agrupacionesReportes: IAgrupacionesReportes = {
                id:registro[0],
                conteo:0,
                detalle:registro[1]
              }
              this.rows_ejecutivos.push(agrupacionesReportes);
              let tiempo:any[] = [];
              for(let index in this.tiempo){
                tiempo.push({"hora":this.tiempo[index].replace(":",""), "tipo":null});
              }
              this.rows_acciones.push(tiempo);
              for(let m=2;m<registro.length;m+=2){
                for(let n =0; n<this.rows_acciones[i-1].length;n++){
                  if(Number(this.rows_acciones[i-1][n]["hora"]) >= registro[m+1]){
                    this.rows_acciones[i-1][n]["tipo"] =  (registro[m] == "O")? "#ffffff":
                                                          (registro[m] == "P")? "#ff0000": "#00ff00";
                  }
                }
              }
            }
          }
          setTimeout(function(){
            let tmpElemento = document.createElement('a');
            let data_type = 'data:application/vnd.ms-excel;charset=UTF-8;';
            let tabla_div = document.getElementById('divReporte');
            let tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
            tmpElemento.href = data_type + ', ' + tabla_html;
            tmpElemento.download = 'EstadoDeEjecutivos.xls';
            tmpElemento.click();
          }, 1000);
        } else {
          Swal('Error', this.validarService.validarError(data), 'error');
        }
      }
    }
    else{
      Swal('Alerta', 'Rango de hora no validos', 'error');
    }
  }
}
