import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ranking-de-ejecutivos-reporte',
  templateUrl: './ranking-de-ejecutivos-reporte.component.html',
  styleUrls: ['./ranking-de-ejecutivos-reporte.component.css']
})
export class RankingDeEjecutivosReporteComponent implements OnInit {
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();

  datos:any[] = [];
  titulo:any[] = [];
  superior:any[] = [];
  gifCarga = true;

  constructor() {

  }

  ngOnInit() {
  }

  cargarDatos(registros){
    this.datos.length = 0;
    this.superior.length = 0;
    for (let index = 0; index < registros.length; index++) {
      let campos = registros[index].split("~");
      if (index == 0) {
        this.superior = campos;
      } else {
        this.datos.push({"rank":campos[0], "ejecutivo": campos[1], "ate":campos[2], "tpo_m": this.minuto(campos[3]), "on_off": campos[4]});
      }
    }
    this.gifCarga = false;
  }

  minuto(value){
    let resp;
    return resp = ((Math.floor(value / 60) != 0) && (Math.floor(value / 60) < 10) ? '0'+Math.floor(value / 60) : Math.floor(value / 60))  + ":" + ((value % 60 < 10) ? '0'+value % 60 : value % 60);
  }

  atras(){
    this.btnVolver.emit("");
  }

}
