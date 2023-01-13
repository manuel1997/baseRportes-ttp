import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-carga-de-trabajo-diaria-grafico',
  templateUrl: './carga-de-trabajo-diaria-grafico.component.html',
  styleUrls: ['./carga-de-trabajo-diaria-grafico.component.css']
})
export class CargaDeTrabajoDiariaGraficoComponent implements OnInit {
  @ViewChild('lineChart') private chartRef;
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();
  
  chart: any;
  horas:any [] = [];
  atendidos:any [] = [];
  perdidos:any [] = [];
  gifCarga = true;

  constructor() { }

  ngOnInit() {
  }
  cargarDatos(informacionGrafico){
    this.horas.length = 0;
    this.atendidos.length = 0;
    this.perdidos.length = 0;
    let registros = informacionGrafico.split("|");
    for(let i=1; i<(registros.length) - 1;i++){
      this.horas.push(registros[i].split("~")[0]);
      this.atendidos.push(registros[i].split("~")[2]);
      this.perdidos.push(registros[i].split("~")[5]);
    }

    if (this.chart) {
      this.chart.clear();
      this.chart.destroy();
    }
    
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
        data: {
            labels: this.horas,
            datasets: [
            { 
                data: this.atendidos,
                backgroundColor: 'rgba(34, 119, 34, 1)',
                label: "Atendidos"
            },
            { 
                data: this.perdidos,
                backgroundColor: 'rgba(170, 48, 48, 1)',
                label: "Perdidos"                   
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
    this.btnVolver.emit("");
  }
}
