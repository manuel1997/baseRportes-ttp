import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//Interface
import { IAgrupacionesReportes } from '../../../../interfaces/agrupacionesReportes';

@Component({
  selector: 'app-motivos-de-atencion-reporte',
  templateUrl: './motivos-de-atencion-reporte.component.html',
  styleUrls: ['./motivos-de-atencion-reporte.component.css']
})
export class MotivosDeAtencionReporteComponent implements OnInit {
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();
  rows: IAgrupacionesReportes[] = [];
  titulo:string = "";
  serie:string = "";
  rangoFecha:string = "";
  gifCarga = true;

  constructor() { }

  ngOnInit() {
  }
  cargarDatos(registros){
    this.rows.length = 0;
    this.titulo = registros.split("|")[0].split("~")[0];
    this.serie = registros.split("|")[0].split("~")[1];
    this.rangoFecha = registros.split("|")[0].split("~")[2] + " y " + registros.split("|")[0].split("~")[3];
    for(let i=1;i<registros.split("|").length;i++){
      let datos = registros.split("|")[i].split("~");
      let iAgrupacionesReportes:IAgrupacionesReportes = {
        detalle:datos[1],
        conteo:datos[2],
        suma:datos[3]
      };
      this.rows.push(iAgrupacionesReportes);
    }
    this.gifCarga = false;
  }
  volver(){
    this.btnVolver.emit("");
  }
}
