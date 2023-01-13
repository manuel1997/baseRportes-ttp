import { Component, OnInit, ViewChild, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { OficinaStatusTablaComponent } from '../../reporte-oficina-online/reporte-oficina-componentes/oficina-status-tabla/oficina-status-tabla.component';

// Services
import { ZonasService } from '../../../servicios/zonas.service';

// Interfaces
import { IZonas } from '../../../interfaces/zonas';
import { IZonasGeneral } from '../../../interfaces/zonas-general';
import { IServiciosGeneral } from '../../../interfaces/servicios-general';
import { ValidarTransaccionService } from '../../../servicios/validar-transaccion.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent implements OnInit {
  @Output() emitParams: EventEmitter<string> = new EventEmitter<string>();

  public zonas: Array<IZonas> = [];
  public zonaActual: IZonas;
  // public id_zona:any = '1';
  public id_zona:any = '0';

  public errorSinDatos: boolean;

  public identificador_zona: any;

  public doughnutChartType: string = 'doughnut';

  public loading: boolean;

  public doughnutChartColors1: any[];
  public doughnutChartColors2: any[];
  public doughnutChartColors3: any[];

  public texto = 'Ver detalle';

  public doughnutChartOptions: any = {
    legend: {
      labels: {
        fontColor: '#9b9b9b',
        fontFamily: "'Open Sans', sans-serif",
        fontStyle: 'italic',
        padding : 30,
        fontSize: 14
      }
    },
    events: [
      'onHover'
    ]
  };

  public intervalo: number;
  public refresca: any = null;

  public zonasDashboard = [];
  public zonasAgrupadas = [];
  public serviciosAgrupados = [];
  public atencionTotal = 0;
  public atencionEspecial = 0;

  mostrarDashboard = true;
  mostrarReporte = false;
  id_zonaLocalStorage: any = 1;

  constructor(
    private _zonas: ZonasService,
    private _location: Location,
    private validarService: ValidarTransaccionService
  ) {
    this.intervalo = 60000;
    this.loading = true;
    this.errorSinDatos = false;

    this.doughnutChartColors1 = this.asignarColor('rgba(73, 118, 46, 1)');
    this.doughnutChartColors2 = this.asignarColor('rgba(11, 92, 137, 1)');
    this.doughnutChartColors3 = this.asignarColor('rgba(255, 159, 64, 1)');
  }

  ngOnInit() {
    this.id_zonaLocalStorage = localStorage.getItem('id_zona') == '' ? 0 : Number(localStorage.getItem('id_zona'));
  }

  ngOnDestroy() {
    clearInterval(this.refresca);
  }

  refrescarDatos() {
    clearInterval(this.refresca);
    this.refresca = setInterval(function () {
      this.listarZonas();
      this.id_zonaLocalStorage = localStorage.getItem('id_zona') == '' ? 0 : Number(localStorage.getItem('id_zona'));
    }.bind(this), this.intervalo);
  }

  async listarZonas() {
    this.zonas = [];

    let data = await this._zonas.listarZonas();
    if (data['data'] == '' || data['data'] == undefined) {
      swal('Error', 'Se ha producido un error.', 'error');
    } else {
      if (this.validarService.validarError(data) == 'ok') {
        let atendiendo = 0;
        let pausa = 0;
        let atendidos = 0;
        let espera = 0;
        let dotacion = 0;
        const zona = 0;
        const nombre = 'Nacional';
        let p_abandono = 0;
        let p_actividad = 0;
        let p_nivel_servicio = 0;
        let atencion_promedio = 0;
        let espera_promedio = 0;
        let max_espera = 0;
        let turnos = 0;

        this.zonasDashboard = [];
        this.zonasAgrupadas = [];
        this.serviciosAgrupados = [];

        this.atencionTotal = 0;
        this.atencionEspecial = 0;

        let id_zona:number = -1;
        data['data'].substring(14, data['data'].length - 5).split('|').forEach((item, index) => {
          if (item.includes('ZON')) {
            const registro = item.split('~');

            this.zonasDashboard.push({
              'id': index,
              'id_zona': Number.parseFloat(registro[0])
            });

            id_zona = Number.parseFloat(registro[0]);

            const zona: IZonasGeneral = {
              id_zona: Number.parseFloat(registro[0]),
              nombre_zona: registro[1],
              porcentaje_abandono: Number.parseFloat(registro[2]),
              porcentaje_nivel_servicio: Number.parseFloat(registro[3]),
              clientes_espera: Number.parseInt(registro[4]),
              tiempo_max_espera: registro[5],
              tiempo_espera_promedio: registro[6],
              tiempo_atencion_promedio: registro[7],
              asistentes_atendiendo: Number.parseInt(registro[8]),
              asistentes_en_pausas: Number.parseInt(registro[9]),
              dotacion_sucursales: Number.parseInt(registro[10]),
              porcentaje_actividad: Number.parseFloat(registro[11]),
              turnos_emitidos: Number.parseInt(registro[12]),
              clientes_atendidos: Number.parseInt(registro[13]),
              clientes_perdidos: Number.parseInt(registro[14]),
              servicios: [],
            };

            this.zonasAgrupadas.push(zona);

          } else {
            if (id_zona !== -1) {
              const registro = item.split('~');
              this.serviciosAgrupados.push({
                'id': registro[0],
                'serie': registro[1],
                'emitidos': registro[2],
                'AteNormal': registro[3],
                // 'AteTOL': registro[4],
                'AteEsp': registro[4],
                'AteTotal': registro[5],
                'perdidos': registro[6],
                // 'cancelados': registro[7],
                'EspOficina': registro[7],
                // 'EspTOL': registro[10],
                'TMEspera': registro[8],
                'TMAtencion': registro[9],
                'eje': registro[12],
                'id_zona': id_zona
              });
            }
          }
        });

        this.zonasAgrupadas.forEach((zona) => {
          let sumaEspeciales = 0;
          let sumaNormales = 0;
          // let sumaTOL = 0;
          let sumaTotal = 0;
          zona.servicios = this.serviciosAgrupados.filter(
            (serv) => {
              if (serv.id_zona === zona.id_zona) {
                sumaEspeciales += Number(serv.AteEsp);
                sumaNormales += Number(serv.AteNormal);
                // sumaTOL += Number(serv.AteTOL);
                sumaTotal += Number(serv.AteTotal);
                return serv;
              }
            }
          );
          zona.especiales = sumaEspeciales;
          zona.normales = sumaNormales;
          // zona.tol = sumaTOL;
          zona.totales = sumaTotal;
        });

      } else {
        swal('Error', this.validarService.validarError(data), 'error');
      }
    }
    this.loading = false;
  }

  mostrarZona(id) {
    // console.log(id);
    for (const i in this.zonas) {
      if (this.zonas[i].id_zona == id) {
        this.zonaActual = this.zonas[i];
        this.id_zona = sessionStorage.setItem('id_zona', this.zonas[i].id_zona.toString());

        if (id === '0') {
          this.texto = 'Ver detalle';
        } else {
          this.texto = 'Ver sucursales';
        }
      }
    }
  }

  volver() {
    this._location.back();
  }

  asignarColor(color: string) {
    var grafico: Array<any>;

    const colorGris: string = '#e0e0e0';

    grafico = [{
      backgroundColor: [color, colorGris],
      borderColor: [
        'rgba(255,255,255,1)',
        'rgba(255,255,255,1)'
      ],
      borderWidth: 1
    }];

    return grafico;
  }

  emitirZona(zona) {
    localStorage.removeItem('id_zona');
    localStorage.setItem('id_zona', zona);

    this.emitParams.emit(zona);
  }

  guardarZona(zona) {
    localStorage.removeItem('id_zona');
    localStorage.setItem('id_zona', zona);
  }
}
