import { Component, OnInit, Input, Output, EventEmitter }  from '@angular/core';

//Interface
import { IReporteEjecutivo } from '../../../../../interfaces/reporteEjecutivo';

@Component({
  selector: 'app-resumen-de-ejecutivo-reporte',
  templateUrl: './resumen-de-ejecutivo-reporte.component.html',
  styleUrls: ['./resumen-de-ejecutivo-reporte.component.css']
})
export class ResumenDeEjecutivoReporteComponent implements OnInit {
  @Input() datosReporte: any;
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();
  titulo:string = "No existen Datos";
  rangoFecha:string = "No existen Datos";

  rows_agrupacionesReportes:IReporteEjecutivo [] = [];
  gifCarga = true;

  constructor() { }

  ngOnInit() {
  }

  mostrarDatos(){
    let div = document.getElementById("loader");
    this.rows_agrupacionesReportes = [];
    let registros = this.datosReporte["data"].substring(14, this.datosReporte["data"].length - 5).split("|");
    let cabecera = registros[0].split("~");
    this.titulo = cabecera[0];
    this.rangoFecha = "Entre " + cabecera[1] + " y " + cabecera[2];

    registros.splice(0,1);

    for(let i in registros){
      let registro = registros[i].split("~");
      let iReporteEjecutivo:IReporteEjecutivo = {
        id:registro[0],
        ejecutivo:registro[1],
        apagadoHora:registro[2],
        apagadoPorcentaje:registro[3],
        activoHora:registro[4],
        activoPorcentaje:registro[5],
        atendiendoHora:registro[6],
        atendiendoPorcentaje:registro[7],
        pausaHora:registro[8],
        pausaPorcentaje:registro[9]
      }
      this.rows_agrupacionesReportes.push(iReporteEjecutivo);
    }
    this.gifCarga = false;
  }
  volver(){
    this.btnVolver.emit();
  }
}
