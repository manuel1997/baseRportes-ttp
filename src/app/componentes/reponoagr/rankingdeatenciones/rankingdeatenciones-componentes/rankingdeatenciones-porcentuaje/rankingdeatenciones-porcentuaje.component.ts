import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

//Servicios
import { ApiTtpService } from '../../../../../servicios/api-ttp.service';
import { AuthService } from '../../../../../servicios/auth.service';
import { borderColor } from '../../../../../servicios/color.graficos';

//Utilidades
import Swal from 'sweetalert2';
import { Chart } from 'chart.js';
import { ValidarTransaccionService } from '../../../../../servicios/validar-transaccion.service';

@Component({
  selector: 'app-rankingdeatenciones-porcentuaje',
  templateUrl: './rankingdeatenciones-porcentuaje.component.html',
  styleUrls: ['./rankingdeatenciones-porcentuaje.component.css']
})
export class RankingdeatencionesPorcentuajeComponent implements OnInit {
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();
  //Datos Grafico
  titulo:string = "No existen Datos";
  rangoFecha:string = "No existen Datos";
  @ViewChild('lineChart') private chartRef;
  chart: any;
  dataTitulo = [];
  dataGrafico = [];
  dataG:any[] = [];

  //Datos Consulta
  superior:any[] = [];
  datos:any[] = [];

  /* borderColor = ["rgba(255,99,132,1)",
     "rgba(54, 162, 235, 1)",
     "rgba(255, 206, 86, 1)",
     "rgba(75, 192, 192, 1)",
     "rgba(153, 102, 255, 1)",
     "rgba(255, 159, 64, 1)"
   ]; */

  gifCarga = true;

  constructor(private authService: AuthService,
              private router: Router,
              private _api: ApiTtpService,
              private validarService: ValidarTransaccionService) {

  }

  ngOnInit() {
  }

  async generarPorcentuaje(){
    this.datos.length = 0;
    this.superior.length = 0;

    let data = await this._api.rgnoa_noagrRankingAtencion();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      Chart.defaults.global.legend.display = false;
      this.dataTitulo.length = 0;
      this.dataGrafico.length = 0;
      if (this.validarService.validarError(data) == 'ok') {
        let str:string;
        str = data.data;
        let registros = str.substring(14, str.length - 5).split("|");
        this.arreglo_datos(registros);
        for (let index = 0; index < registros.length; index++) {
          let campos = registros[index].split("~");

          if (campos[0] != 'TOT' && index > 0) {
            this.dataGrafico.push(campos[3]);
          }

        }
        this.grafica();
      } else {
        Swal('Error', this.validarService.validarError(data), 'error');
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }
  }

  arreglo_datos(arreglo) {
    for (let index = 0; index < arreglo.length; index++) {
      let campos = arreglo[index].split("~");
      if (index == 0) {
        this.superior = campos;
      } else {
        if (campos[0] != 'TOT') {
          this.datos.push({"oficina":campos[0],"serie":campos[1]});
        }
      }
    }
    this.datos.forEach((item, i=0) => {
      item.id = i+1;
    });

    this.gifCarga = false;
  }

  grafica(){
    if (this.chart) {
      this.chart.clear();
      this.chart.destroy();
    }
    this.dataGrafico.forEach((item, i=0) => {
      this.dataTitulo.push(i+1);
    });
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: (this.dataTitulo != undefined )? this.dataTitulo : ["Sin registros"],
        datasets: [
          {
            label: 'Ranking Atenciones',
            data: (this.dataTitulo != undefined )? this.dataGrafico : [],
            backgroundColor: [
             /* 'rgba(54, 162, 235, 1)',
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
             'rgba(128, 0, 0, 1)' */
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(176, 23, 31, 1)",
              "rgba(139, 28, 98, 1)",
              "rgba(85, 26, 139, 1)",
              "rgba(96, 123, 139, 1)",
              "rgba(0, 229, 238, 1)",
              "rgba(0, 128, 0, 1)",
              "rgba(139, 101, 8, 1)",
              "rgba(198, 113, 113, 1)",
              "rgba(139, 71, 93, 1)",
              "rgba(93, 71, 139, 1)",
              "rgba(0, 191, 255, 1)",
              "rgba(0, 206, 209, 1)",
              "rgba(0, 201, 87, 1)",
              "rgba(69, 139, 0, 1)",
              "rgba(154, 205, 50, 1)",
              "rgba(128, 128, 0, 1)",
              "rgba(218, 165, 32, 1)",
              "rgba(139, 90, 0, 1)",
              "rgba(244, 164, 96, 1)",
              "rgba(41, 36, 33, 1)",
              "rgba(138, 51, 36, 1)",
            ],
            lineTension:0.2,
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
        text:"Ranking de Atenciones",
        display:true
        }
      }
    });
  }

  atras(){
    this.btnVolver.emit();
  }

}
