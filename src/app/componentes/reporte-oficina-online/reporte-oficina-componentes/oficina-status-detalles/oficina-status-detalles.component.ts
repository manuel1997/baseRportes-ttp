import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//Servicios
import { ApiTtpService } from '../../../../servicios/api-ttp.service';

@Component({
  selector: 'app-oficina-status-detalles',
  templateUrl: './oficina-status-detalles.component.html',
  styleUrls: ['./oficina-status-detalles.component.css']
})
export class OficinaStatusDetallesComponent implements OnInit {
  @Input() dataDetalle: any;
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();

  oficina:string = "";
  status:string = "";
  dia:string = "";

  rows_series:any [] = [];
  rows_esc:any [] = [];

  public intervalcargarDatos: any;

  constructor(private apiTtpService:ApiTtpService) {

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    clearInterval(this.intervalcargarDatos);
  }

  intervalo(value) {
    let minutos:number = 0;
    minutos = 60 * (value*1000);
    this.intervalcargarDatos = setInterval(() => {
      this.cargarDatos();
    }, minutos);
  }

  cargarDatos(){
    this.rows_series.length = 0;
    this.rows_esc.length = 0;

    let registros = this.dataDetalle.split("|");
    let encabezado = registros[0].split("~");
    this.oficina = encabezado[1];
    this.status = encabezado[2];
    this.dia = encabezado[3];

    let contador = 0;

    for(let i=1; i< registros.length; i++){
      let registro = registros[i].split("~");
      //console.log(registro);

      if (registro[0] == 'SER') {
        this.rows_series.push({
          "id": registro[1],
          "serie": registro[2],
          "emitidos": registro[3],
          "AteNormal": registro[4],
          "AteEsp": registro[5],
          "AteTotal": registro[6],
          "perdidos": registro[7],
          "EspOficina": registro[8],
          "TMEspera": registro[9],
          "TMAtencion": registro[10],
          "eje": registro[11],

          /* "id": registro[1],
          "serie": registro[2],
          "emitidos": registro[3],
          "AteNormal": registro[4],
          "AteTOL": registro[5],
          "AteEsp": registro[6],
          "AteTotal": registro[7],
          "perdidos": registro[8],
          "cancelados": registro[9],
          "EspOficina": registro[10],
          "EspTOL": registro[11],
          "TMEspera": registro[12],
          "TMAtencion": registro[13],
          "eje": registro[14], */
        });
      } else {
        if (this.rows_esc.length > 0) {
          if (registro[4] == this.rows_esc[contador-1]['indice']) {
            this.rows_esc.push({
              "id_serie": registro[1],
              "filas": 0,
              "status": this.icono(registro[3], registro[1], registro[11]),
              "indice": registro[4],
              "ejecutivo": registro[5],
              "serie": registro[6],
              "AteNormal": registro[7],
              "AteEsp": registro[8],
              "AteTotal": registro[9],
              "turno": registro[10],
              "hinicio": registro[13],
              "id_cliente": registro[16],
              "tpo": registro[12],
              "motivo_pausa": registro[14],
              "hora_pausa": registro[15],

              /* "id_serie": registro[1],
              "filas": 0,
              "status": this.icono(registro[3], registro[1], registro[12]),
              "indice": registro[4],
              "ejecutivo": registro[5],
              "serie": registro[6],
              "AteNormal": registro[7],
              "AteTOL": registro[8],
              "AteEsp": registro[9],
              "AteTotal": registro[10],
              "turno": registro[11],
              "hinicio": registro[14],
              "id_cliente": registro[17],
              "tpo": registro[13],
              "motivo_pausa": registro[15],
              "hora_pausa": registro[16], */
            });
          } else{
            this.rows_esc.push({
              "id_serie": registro[1],
              "filas": registro[2],
              "status": this.icono(registro[3], registro[1], registro[11]),
              "indice": registro[4],
              "ejecutivo": registro[5],
              "serie": registro[6],
              "AteNormal": registro[7],
              "AteEsp": registro[8],
              "AteTotal": registro[9],
              "turno": registro[10],
              "hinicio": registro[13],
              "id_cliente": registro[16],
              "tpo": registro[12],
              "motivo_pausa": registro[14],
              "hora_pausa": registro[15],

              /* "id_serie": registro[1],
              "filas": registro[2],
              "status": this.icono(registro[3], registro[1], registro[12]),
              "indice": registro[4],
              "ejecutivo": registro[5],
              "serie": registro[6],
              "AteNormal": registro[7],
              "AteTOL": registro[8],
              "AteEsp": registro[9],
              "AteTotal": registro[10],
              "turno": registro[11],
              "hinicio": registro[14],
              "id_cliente": registro[17],
              "tpo": registro[13],
              "motivo_pausa": registro[15],
              "hora_pausa": registro[16], */
            });
          }
        } else {
          this.rows_esc.push({
            "id_serie": registro[1],
            "filas": registro[2],
            "status": this.icono(registro[3], registro[1], registro[11]),
            "indice": registro[4],
            "ejecutivo": registro[5],
            "serie": registro[6],
            "AteNormal": registro[7],
            "AteEsp": registro[8],
            "AteTotal": registro[9],
            "turno": registro[10],
            "hinicio": registro[13],
            "id_cliente": registro[16],
            "tpo": registro[12],
            "motivo_pausa": registro[14],
            "hora_pausa": registro[15],

            /* "id_serie": registro[1],
            "filas": registro[2],
            "status": this.icono(registro[3], registro[1], registro[12]),
            "indice": registro[4],
            "ejecutivo": registro[5],
            "serie": registro[6],
            "AteNormal": registro[7],
            "AteTOL": registro[8],
            "AteEsp": registro[9],
            "AteTotal": registro[10],
            "turno": registro[11],
            "hinicio": registro[14],
            "id_cliente": registro[17],
            "tpo": registro[13],
            "motivo_pausa": registro[15],
            "hora_pausa": registro[16], */
          });
        }
        contador++;
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

  icono(valor, ser, atendiendo){
    //console.log(valor);
    let resp;
    switch (valor) {
      case 'I':
      case 'o':
      case 'a':
        let a = this.rows_series.find(serie=> serie.id == ser);
        if (a.perdidos > 0) {
          resp = "assets/img/of-02.svg";
        } else {
          resp = "assets/img/of-01.svg";
        }
      break;
      case 'E':
      case 'e':
        resp = "assets/img/of-03.svg";
      break;
      case 'A':
        if (atendiendo >= 0) {
          resp = "assets/img/of-04.svg";
        } else {
          resp = "assets/img/of-05.svg";
        }
      break;
      case 'O':
        a = this.rows_series.find(serie=> serie.id == ser);
        if (a.perdidos > 0) {
          resp = "assets/img/of-07.svg";
        } else {
          resp = "assets/img/of-06.svg";
        }
      break;
      default:
        resp = "assets/img/of-01.svg";
      break;
    }
    return resp;
  }

  atras(){
    this.btnVolver.emit();
  }

}
