import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//Interface
import { IAgrupacionesReportes } from '../../../../../interfaces/agrupacionesReportes';

@Component({
  selector: 'app-motivos-de-pausa-reporte',
  templateUrl: './motivos-de-pausa-reporte.component.html',
  styleUrls: ['./motivos-de-pausa-reporte.component.css']
})
export class MotivosDePausaReporteComponent implements OnInit {
  @Input() datosReporte: any;
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();
  titulo:string = "No existen Datos";
  rangoFecha:string = "No existen Datos";

  rows_agrupacionesReportes:IAgrupacionesReportes [] = [];
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
      let iAgrupacionesReportes:IAgrupacionesReportes = {
        detalle:registro[1],
        conteo:registro[2]
      }
      this.rows_agrupacionesReportes.push(iAgrupacionesReportes);
    }
    this.gifCarga = false;
  }
  volver(){
    this.btnVolver.emit();
  }
}
