import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

//Interface
import { IAgrupacionesReportes } from '../../../../../interfaces/agrupacionesReportes';

@Component({
  selector: 'app-motivos-de-pausa-graficos',
  templateUrl: './motivos-de-pausa-graficos.component.html',
  styleUrls: ['./motivos-de-pausa-graficos.component.css']
})
export class MotivosDePausaGraficosComponent implements OnInit {
  @Input() datosReporte: any;
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();
  titulo:string = "No existen Datos";
  rangoFecha:string = "No existen Datos";
  @ViewChild('lineChart') private chartRef;
  chart: any;
  dataTitulo = [];
  dataGrafico = [];

  rows_agrupacionesReportes:IAgrupacionesReportes [] = [];
  gifCarga = true;

  constructor() { }

  ngOnInit() {
  }

  mostrarDatos(){
    let registros = this.datosReporte["data"].substring(14, this.datosReporte["data"].length - 5).split("|");
    let cabecera = registros[0].split("~");
    this.titulo = cabecera[0];
    this.rangoFecha = "Entre " + cabecera[1] + " y " + cabecera[2];
    Chart.defaults.global.legend.display = false;
    this.dataTitulo.length = 0;
    this.dataGrafico.length = 0;
    let contador = 0;
    this.rows_agrupacionesReportes.length = 0;
    for(let i in registros){
      if(contador > 0){
        let registro = registros[i].split("~");
        let iAgrupacionesReportes:IAgrupacionesReportes = {
          id:registro[0],
          detalle:registro[1],
          conteo:registro[2]
        }
        this.dataTitulo.push(registro[1]);
        this.dataGrafico.push(registro[2]);
        this.rows_agrupacionesReportes.push(iAgrupacionesReportes);
      }
      contador++;
    }
    if (this.chart) {
      this.chart.clear();
      this.chart.destroy();
    }
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
      labels: (this.dataTitulo[0] != undefined )? this.dataTitulo : ["Sin registros"],
      datasets: [
        {
          label: null,
          data: (this.dataTitulo[0] != undefined )? this.dataGrafico : [],
          backgroundColor: [
           'rgba(54, 162, 235, 1)',
           'rgba(255, 99, 132, 1)',
           'rgba(255, 206, 86, 1)',
           'rgba(75, 192, 192, 1)',
           'rgba(153, 102, 255, 1)',
           'rgba(230, 25, 75, 1)',
           'rgba(60, 180, 75, 1)',
           'rgba(245, 130, 48, 1)',
           'rgba(145, 30, 180, 1)',
           'rgba(210, 245, 60, 1)',
           'rgba(0, 128, 128, 1)',
           'rgba(128, 0, 0, 1)'
          ],
          lineTension:0.2,
          borderWidth: 1
        }
      ]
      },
      options: {
        title: {
        text:"Motivos de Pausa",
        display:true
        }
      }
    });
    this.gifCarga = false;
  }
  volver(){
    this.btnVolver.emit();
  }
}
