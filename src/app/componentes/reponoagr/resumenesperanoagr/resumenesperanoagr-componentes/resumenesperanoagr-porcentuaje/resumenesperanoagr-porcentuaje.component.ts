import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {Router} from "@angular/router";

//Servicios
import { ApiTtpService } from '../../../../../servicios/api-ttp.service';
import { AuthService } from '../../../../../servicios/auth.service';
import { borderColor } from '../../../../../servicios/color.graficos';

//Utilidades
import Swal from 'sweetalert2';
import { Chart } from 'chart.js';
import { ValidarTransaccionService } from '../../../../../servicios/validar-transaccion.service';

@Component({
  selector: 'app-resumenesperanoagr-porcentuaje',
  templateUrl: './resumenesperanoagr-porcentuaje.component.html',
  styleUrls: ['./resumenesperanoagr-porcentuaje.component.css']
})
export class ResumenesperanoagrPorcentuajeComponent implements OnInit {
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
    this._api.resumenea_noagr.g = 'g';

    let data = await this._api.rgnoa_noagrResumenEA();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      if (this.validarService.validarError(data) == 'ok') {
        Chart.defaults.line.spanGaps = true;
        this.dataTitulo.length = 0;
        this.dataGrafico.length = 0;

        let contador:number = 0;
        let str:string;
        str = data.data;
        let registros = str.substring(14, str.length - 5).split("|");
        this.arreglo_datos();
        for (let index = 0; index < registros.length; index++) {
          let campos = registros[index].split("~");
          if (index > 0) {
            if (campos[0] == 'DATA') {
              this.dataG.push(campos[1]);
            } else if (campos[0] == 'SERIE') {
              if (this.dataG.length > 0) {
                this.dataGrafico.push({
                  label : '',
                  data : this.dataG,
                  borderWidth: 1,
                  borderColor: borderColor[contador],
                  fill: false
                });
                if (contador == borderColor.length) {
                  contador = 0;
                } else {
                  contador++;
                }
              }
              this.dataG = [];
              this.dataTitulo.push(campos[1]+'-'+campos[2]);
            }
          }
        }
        if (this.dataG.length > 0) {
          this.dataGrafico.push({
            label : '',
            data : this.dataG,
            borderWidth: 1,
            borderColor: borderColor[contador],
            fill: false
          });
        }
        this.grafica();
      } else {
        Swal('Error', this.validarService.validarError(data), 'error');
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }
  }

  async arreglo_datos() {
    this._api.resumenea_noagr.g = 'R';

    let data = await this._api.rgnoa_noagrResumenEA();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      if (this.validarService.validarError(data) == 'ok') {
        let contador: number = 0;
        let str: string;
        str = data.data;
        let registros = str.substring(14, str.length - 5).split("|");
        for (let index = 0; index < registros.length; index++) {
          let campos = registros[index].split("~");
          if (index == 0) {
            this.superior = campos;
          } else {
            if (campos[0] == 'SERIE') {
              this.datos.push({"oficina": campos[1],"serie": campos[2]});
            }
          }
        } //console.log(this.datos);
        this.datos.forEach((item, i=0) => {
          item.id = i+1;
        });
      } else {
        Swal('Error', this.validarService.validarError(data), 'error');
      }
    }
    this.gifCarga = false;
  }

  grafica() {
    if (this.chart) {
      this.chart.clear();
      this.chart.destroy();
    }
    this.dataGrafico.forEach((item, i=0) => {
      item.label = i+1;
    });
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: (this.dataTitulo != undefined ) ? this.dataTitulo : ['Sin registros'],
        datasets: this.dataGrafico
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  }

  atras(){
    this.btnVolver.emit();
  }

}
