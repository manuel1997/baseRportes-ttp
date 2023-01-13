import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//Interface
import { ICargaDeTrabajoDiaria } from '../../../../interfaces/cargaDeTrabajoDiaria';

@Component({
  selector: 'app-carga-de-trabajo-diaria-reporte',
  templateUrl: './carga-de-trabajo-diaria-reporte.component.html',
  styleUrls: ['./carga-de-trabajo-diaria-reporte.component.css']
})
export class CargaDeTrabajoDiariaReporteComponent implements OnInit {
  rows_cargaDeTrabajoDiaria: ICargaDeTrabajoDiaria[] = [];
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();

  titulo: string = "";
  serie:string = "";
  rangoFecha: string = "";

  totalTurnosEmitidos: string = "";
  totalNormal: string = "";
  totalTOL: string = "";
  totalEspecial: string = "";
  totalTurnosPerdidos: string = "";
  totalTurnosPerdidosTOL: string = "";
  totalGeneral: string = "";
  gifCarga = true;

  constructor() { }

  ngOnInit() {
  }

  cargarDatos(data){
    this.rows_cargaDeTrabajoDiaria.length = 0;
    let registros = data.split("|");
    this.titulo = registros[0].split("~")[0];
    this.serie = registros[0].split("~")[1];
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

    this.gifCarga = false;
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
  volver(){
    this.btnVolver.emit("");
  }
}
