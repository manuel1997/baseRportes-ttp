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
  selector: 'app-tendencia-de-atencion-graficos',
  templateUrl: './tendencia-de-atencion-graficos.component.html',
  styleUrls: ['./tendencia-de-atencion-graficos.component.css']
})
export class TendenciaDeAtencionGraficosComponent implements OnInit {
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();

  //Datos Grafico
  titulo:string = "No existen Datos";
  rangoFecha:string = "No existen Datos";
  @ViewChild('lineChart') private chartRef;
  chart: any;
  dataTitulo = [];
  dataGrafico = [];

  //Datos Consulta

  superior:any[] = [];
  periodos:any[] = [];
  datos:any[] = [];

  rango:string = "";

  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  /*borderColor = ["rgba(255,99,132,1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)"
    ];*/

    gifCarga = true;

  constructor(private authService: AuthService,
              private router: Router,
              private _api: ApiTtpService,
              private validarService: ValidarTransaccionService) {

  }

  ngOnInit() {
  }

  async generarGrafico(){
    this.datos.length = 0;
    this.superior.length = 0;
    this.periodos.length = 0;
    this.rango = "";

    let data = await this._api.rgnoa_noagrTendenciaAtencion();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      if (this.validarService.validarError(data) == 'ok') {
        Chart.defaults.line.spanGaps = true;
        this.dataTitulo.length = 0;
        this.dataGrafico.length = 0;

        let str:string;
        let contador:number = 0;
        str = data.data;
        let registros = str.substring(14, str.length - 5).split("|");
        this.arreglo_datos(registros);
        for (let index = 0; index < registros.length; index++) {
          let campos = registros[index].split("~");
          switch (index) {
            case 0:
              this.superior = campos;
            break;
            case 1:
              campos.splice(0, 3);
              this.fecha(campos, this.superior[2]);
            break;
            case registros.length-1:
            break;
            default:

              this.dataGrafico.push({
                label : '',
                data : campos.splice(3, 3),
                borderWidth: 1,
                borderColor: borderColor[contador],
                fill: false
              });

              if (contador == borderColor.length) {
                contador = 0;
              } else {
                contador++;
              }

            break;
          }
          // contador++;
        }
        this.grafica();
      } else {
        Swal('Error', this.validarService.validarError(data), 'error');
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }
    this.gifCarga = false;
  }

  arreglo_datos(arreglo) {
    for (let index = 0; index < arreglo.length; index++) {
      let campos = arreglo[index].split("~");
      switch (index) {
        case 0:
        break;
        case 1:
        break;
        case arreglo.length-1:
        break;
        default:
          this.datos.push(campos.splice(1, 2));
        break;
      }
    }
    this.datos.forEach((item, i=0) => {
      item.unshift(i+1);
    });
  }

  fecha(arreglo, tipo){
    let anio = (new Date()).getFullYear();
    let elemento;
    let dd;
    let mm;
    let resp;
    for (let index = 0; index < arreglo.length; index++) {
      if (arreglo[index] == 0) {

      } else {
        switch (tipo) {
          case 'M':
            elemento = new Date(arreglo[index]);
            mm = this.meses[elemento.getMonth()];
            this.periodos.push(mm);
            this.rango = 'Meses';
          break;
          case 'S':
            elemento = new Date(anio, 0, (arreglo[index] - 1) * 7 + 1);
            dd = elemento.getDate();
            mm = elemento.getMonth()+1;
            resp;
            if(dd < 10){
              resp = '0' + dd+'/'+mm;
            } else {
              resp = dd+'/'+mm;
            }
            this.periodos.push(resp);
            this.rango = 'Semanas';
          break;
          case 'D':
            this.periodos.push(arreglo[index]);
            this.rango = 'Días';
          break;
          default:
            this.periodos.push(arreglo[index]);
            this.rango = 'Días';
          break;
        }
      }
    }
  }

  grafica(){
    if (this.chart || this.chart != null) {
      this.chart.clear();
      this.chart.destroy();
    }
    this.dataGrafico.forEach((item, i=0) => {
      item.label = i+1;
    });
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: (this.periodos != undefined )? this.periodos : ["Sin registros"],
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
