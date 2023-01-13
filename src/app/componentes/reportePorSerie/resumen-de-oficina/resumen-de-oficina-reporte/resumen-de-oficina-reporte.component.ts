import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//Interface
import { IResumenDeOficina } from '../../../../interfaces/resumenDeOficina'

@Component({
  selector: 'app-resumen-de-oficina-reporte',
  templateUrl: './resumen-de-oficina-reporte.component.html',
  styleUrls: ['./resumen-de-oficina-reporte.component.css']
})
export class ResumenDeOficinaReporteComponent implements OnInit {
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();
  oficina:string = "";
  serie:string = "";
  entreDias:string = "";
  entreHoras:string = "";
  diasIncluidos:string = "";

  rows_resumenDeOficina: IResumenDeOficina[] = [];

  totalTurnosEmitidos:string = "";
  totalTurnosNormal:string = "";
  totalTurnosTol:string = "";
  totalTurnosEspecial:string = "";
  totalTurnosTotal:string = "";
  totalTurnosPerdidos:string = "";
  totalTurnosPerdidosTol:string = "";
  totalTurnosGeneral:string = "";
  gifCarga = true;

  constructor() { }

  ngOnInit() {
  }

  cargarDatos(data){
    this.rows_resumenDeOficina.length = 0;
    let encabezado = data.split("|")[0].split("~");
    this.oficina = encabezado[0];
    this.serie = encabezado[1];
    //this.entreDias = encabezado[2].split("-")[2] + "/" + encabezado[2].split("-")[1]+ "/" + encabezado[2].split("-")[0] + " y " + encabezado[3].split("-")[2] + "/" + encabezado[3].split("-")[1] + "/" +encabezado[3].split("-")[0];
    this.entreDias = encabezado[2] + " y " + encabezado[3];
    this.entreHoras = encabezado[4] + " Hrs. a " + encabezado[5] + " Hrs. y " + encabezado[6] + " a " + encabezado[7] + " Hrs.";
    this.diasIncluidos = encabezado[8];
    for(let i=1;i<(data.split("|").length - 1);i++){
      let registros = data.split("|")[i].split("~");
      let iResumenDeOficina = {
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
    this.totalTurnosEmitidos = data.split("|")[data.split("|").length - 1].split("~")[1];
    this.totalTurnosNormal = data.split("|")[data.split("|").length - 1].split("~")[2];
    this.totalTurnosTol = data.split("|")[data.split("|").length - 1].split("~")[2];
    this.totalTurnosEspecial = data.split("|")[data.split("|").length - 1].split("~")[3];
    this.totalTurnosTotal = data.split("|")[data.split("|").length - 1].split("~")[4];
    this.totalTurnosPerdidos = data.split("|")[data.split("|").length - 1].split("~")[5];
    this.totalTurnosPerdidosTol = data.split("|")[data.split("|").length - 1].split("~")[6];
    this.totalTurnosGeneral = data.split("|")[data.split("|").length - 1].split("~")[6];

    this.gifCarga = false;
  }
  
  volver(){
    this.btnVolver.emit("");
  }
}
