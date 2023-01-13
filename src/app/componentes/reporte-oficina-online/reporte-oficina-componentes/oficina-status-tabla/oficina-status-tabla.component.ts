import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//Servicios
import { ApiTtpService } from '../../../../servicios/api-ttp.service';
import { ValidarTransaccionService } from '../../../../servicios/validar-transaccion.service';

//Interface
import { OficinaReporte } from '../../../../interfaces/oficinasOnline';
import swal from 'sweetalert2';


@Component({
  selector: 'app-oficina-status-tabla',
  templateUrl: './oficina-status-tabla.component.html',
  styleUrls: ['./oficina-status-tabla.component.css']
})
export class OficinaStatusTablaComponent implements OnInit {
  @Output() dataDetalle: EventEmitter<any> = new EventEmitter<any>();
  @Input() dataShared: string;
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();

  rows_oficinas: any[] = [];
  gifCarga = true;

  constructor(private apiTtpService:ApiTtpService, public validarService: ValidarTransaccionService) {
  }

  ngOnInit() {
  }

  async cargarDatos(){
    this.rows_oficinas.length = 0;
    this.apiTtpService.id_usuario = localStorage.getItem("repoid_usuario");
    this.apiTtpService.user = localStorage.getItem("repousuario");
    this.apiTtpService.pass_usuario = localStorage.getItem("repopassword");
    if (this.apiTtpService.id_usuario && this.apiTtpService.user) {
      let data = await this.apiTtpService.obtenerOficina_reporte();
      if(this.validarService.validarError(data) == 'ok'){
        let registros = data["data"].substring(14, data["data"].length - 5).split("|");
        //let contador = 0;
        for(let i = 0; i < registros.length; i++){
          let registro = registros[i].split("~");
          if (this.rows_oficinas.length > 0) {
            if (registro[0] == this.rows_oficinas[i-1]['ID']) {
              this.rows_oficinas.push({
                "ID": registro[0],
                "informacion": registro[1],
                "filas": "",
                "oficina": registro[3],
                "status": registro[4],
                "serie": registro[5],
                "eje": registro[6],
                "ofiEsp": registro[7],
                "emitidos": registro[8],
                "NormalAte": registro[9],
                "EspAte": registro[10],
                "TotalAte": registro[11],
                "perdidos": registro[12],
                "TPEspera": registro[13],
                "TPAtencion": registro[14],
                "update": registro[15],

                // TOL
                /* "ID": registro[0],
                "informacion": registro[1],
                "filas": "",
                "oficina": registro[3],
                "status": registro[4],
                "serie": registro[5],
                "eje": registro[6],
                "ofiEsp": registro[7],
                "TOLEsp": registro[8],
                "emitidos": registro[9],
                "NormalAte": registro[10],
                "TOLAte": registro[11],
                "EspAte": registro[12],
                "TotalAte": registro[13],
                "perdidos": registro[14],
                "cancelados": registro[15],
                "TPEspera": registro[16],
                "TPAtencion": registro[17],
                "TPDeltaEspera": registro[18],
                "update": registro[19] */

              });
            } else {
              this.rows_oficinas.push({
                "ID": registro[0],
                "informacion": registro[1],
                "filas": registro[2],
                "oficina": registro[3],
                "status": registro[4],
                "serie": registro[5],
                "eje": registro[6],
                "ofiEsp": registro[7],
                "emitidos": registro[8],
                "NormalAte": registro[9],
                "EspAte": registro[10],
                "TotalAte": registro[11],
                "perdidos": registro[12],
                "TPEspera": registro[13],
                "TPAtencion": registro[14],
                "update": registro[15],

                //TOL
                /* "ID": registro[0],
                "informacion": registro[1],
                "filas": registro[2],
                "oficina": registro[3],
                "status": registro[4],
                "serie": registro[5],
                "eje": registro[6],
                "ofiEsp": registro[7],
                "TOLEsp": registro[8],
                "emitidos": registro[9],
                "NormalAte": registro[10],
                "TOLAte": registro[11],
                "EspAte": registro[12],
                "TotalAte": registro[13],
                "perdidos": registro[14],
                "cancelados": registro[15],
                "TPEspera": registro[16],
                "TPAtencion": registro[17],
                "TPDeltaEspera": registro[18],
                "update": registro[19] */
              });
            }
          } else {
            this.rows_oficinas.push({
              "ID": registro[0],
              "informacion": registro[1],
              "filas": registro[2],
              "oficina": registro[3],
              "status": registro[4],
              "serie": registro[5],
              "eje": registro[6],
              "ofiEsp": registro[7],
              "emitidos": registro[8],
              "NormalAte": registro[9],
              "EspAte": registro[10],
              "TotalAte": registro[11],
              "perdidos": registro[12],
              "TPEspera": registro[13],
              "TPAtencion": registro[14],
              "update": registro[15],

              //TOL

              /* "ID": registro[0],
              "informacion": registro[1],
              "filas": registro[2],
              "oficina": registro[3],
              "status": registro[4],
              "serie": registro[5],
              "eje": registro[6],
              "ofiEsp": registro[7],
              "TOLEsp": registro[8],
              "emitidos": registro[9],
              "NormalAte": registro[10],
              "TOLAte": registro[11],
              "EspAte": registro[12],
              "TotalAte": registro[13],
              "perdidos": registro[14],
              "cancelados": registro[15],
              "TPEspera": registro[16],
              "TPAtencion": registro[17],
              "TPDeltaEspera": registro[18],
              "update": registro[19] */
            });
          }
          //contador++;
        }

        this.gifCarga = false;
      } else {
        this.gifCarga = false;
        swal('Error', this.validarService.validarError(data), 'error');
      }
    }
  }

  minuto(value){
    let resp;
    if (value < 0) {
      value = -value;
    }
    return resp = ((Math.floor(value / 60) != 0) || (Math.floor(value / 60) < 10) ? Math.floor(value / 60) : '0'+Math.floor(value / 60))  + ":" + ((value % 60 < 10) ? '0'+value % 60 : value % 60);
  }

  async mostrarDetalle(oficina){
    let ioficina:OficinaReporte = {
      usuario:null,
      password:null,
      id_usuario:null,
      id_oficina: null,
      id_zona: null
    };
    ioficina.id_usuario = String(localStorage.getItem("repoid_usuario"));
    ioficina.usuario = localStorage.getItem("repousuario");
    ioficina.password = localStorage.getItem("repopassword");
    ioficina.id_oficina = oficina;
    let data = await this.apiTtpService.obtenerDetalleOficina_reporte(ioficina);
    if(this.validarService.validarError(data) == 'ok'){
      this.dataDetalle.emit(data["data"].substring(14, data["data"].length - 5));
    }
    /*this.apiTtpService.obtenerDetalleOficina_reporte(ioficina).subscribe(data => {
      this.dataDetalle.emit(data["data"].substring(14, data["data"].length - 5));
    });*/
  }

  atras() {
    this.btnVolver.emit();
  }
}
