import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

//Interface
import { IAgrupacionesReportes } from '../../../../interfaces/agrupacionesReportes';

@Component({
  selector: 'app-motivos-de-atencion-grafico',
  templateUrl: './motivos-de-atencion-grafico.component.html',
  styleUrls: ['./motivos-de-atencion-grafico.component.css']
})
export class MotivosDeAtencionGraficoComponent implements OnInit {
  @Input() datosReporte: any;
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();
  titulo:string = "No existen Datos";
  serieDetalle:string = "No existen Datos";
  rangoFecha:string = "No existen Datos";
  @ViewChild('lineChart') private chartRef;
  chart: any;
  dataTitulo = [];
  dataGrafico = [];
  dataGraficoDelta = [];

  rows_agrupacionesReportes:IAgrupacionesReportes [] = [];
  gifCarga = true;

  constructor() { }

  ngOnInit() {
  }

  mostrarDatos(){
    let registros = this.datosReporte.split("|");
    let cabecera = registros[0].split("~");
    this.titulo = cabecera[0];
    this.serieDetalle = cabecera[1];
    this.rangoFecha = "Entre " + cabecera[2] + " y " + cabecera[3];
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
        this.dataGraficoDelta.push(Number(registro[3]) - Number(registro[2]));
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
            labels: this.dataTitulo,
            datasets: [
            { 
                data: this.dataGrafico,
                backgroundColor: 'rgba(34, 119, 34, 1)',
                label: "Veces"
            },
            { 
                data: this.dataGraficoDelta,
                backgroundColor: 'rgba(170, 48, 48, 1)',
                label: "Delta Suma"                   
            },
          ]
        },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                        beginAtZero:true,
                        responsive: false,
                        maintainAspectRatio: true
                        }
                    }]
                }
            }
    });
    this.gifCarga = false;
  }
  volver(){
    this.btnVolver.emit();
  }

}
