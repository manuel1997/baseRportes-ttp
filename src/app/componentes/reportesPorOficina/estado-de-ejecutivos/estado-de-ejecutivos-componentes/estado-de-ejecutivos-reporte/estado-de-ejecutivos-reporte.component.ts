import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//Interface
import { IAgrupacionesReportes } from '../../../../../interfaces/agrupacionesReportes';

@Component({
  selector: 'app-estado-de-ejecutivos-reporte',
  templateUrl: './estado-de-ejecutivos-reporte.component.html',
  styleUrls: ['./estado-de-ejecutivos-reporte.component.css']
})
export class EstadoDeEjecutivosReporteComponent implements OnInit {
  @Input() datosReporte: any;
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();
  horaInicio:number = 0;
  horaFin:number = 23;
  intervalo:number = 30;
  tiempo:string[] = [];

  oficina:string = "";
  dia:string = "";
  entreHoras:string = "";

  rows_ejecutivos:IAgrupacionesReportes [] = [];
  rows_acciones:any [] = [];
  gifCarga = true;

  constructor() { }

  ngOnInit() {
  }

  cargarDatos(){
    this.tiempo.length = 0;
    this.rows_ejecutivos.length = 0;
    this.rows_acciones.length = 0;
    for(let i = this.horaInicio; i<this.horaFin; i++){
      for(let j=0;j<60;j+=this.intervalo){
        let hora = (i.toString().length == 1)? '0' + i : i;
        let minuto = (j.toString().length == 1)? '0' + j : j;
        this.tiempo.push(hora+":"+minuto);
      }
    }

    this.tiempo.push(this.horaFin+":00");
    let dato = this.datosReporte.replace("||", "|");
    let registros = dato.split("|");
    let encabezado = registros[0].split("~");
    this.oficina = encabezado[0];
    this.dia = encabezado[1];
    this.entreHoras = encabezado[2] + " Hrs. y " + encabezado[3] + " Hrs.";
    
    for(let i=1; i<registros.length; i++){
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

          for(let m=2; m<registro.length; m+=2){
            if (this.rows_acciones[i-1]) {
              for(let n=0; n<this.rows_acciones[i-1].length; n++){
                if(Number(this.rows_acciones[i-1][n]["hora"]) >= registro[m+1]){
                  this.rows_acciones[i-1][n]["tipo"] =  (registro[m] == "O")? "white": 
                                                        (registro[m] == "P")? "red": "green";
                }
              } 
            }
          }
        }
      
    }
    
    this.gifCarga = false;
  }
  volver(){
    this.btnVolver.emit();
  }
}
