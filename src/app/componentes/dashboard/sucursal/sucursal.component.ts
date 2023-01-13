import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// Services
import { SucursalService } from '../../../servicios/sucursal.service';
import { ZonasService } from '../../../servicios/zonas.service';

// Interfaces
import { ISucursal } from '../../../interfaces/sucursal';
import { IAsistente } from '../../../interfaces/asistente';
import { IServicioAtencion } from '../../../interfaces/servicioAtencion';
import { ISucursalGeneral } from '../../../interfaces/sucursalGeneral';
import swal from 'sweetalert2';
import { ValidarTransaccionService } from '../../../servicios/validar-transaccion.service';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {
  public sucursal: ISucursal;
  public asistente: Array<IAsistente> = [];
  public servicioAtencion: Array<IServicioAtencion> = [];

  public error: boolean;
  public loading: boolean;

  public nombreSucursal: string;

  public intervalo: number;
  public refresca: any = null;

  public id: any;

  public id_zona: any;
  public nombreZona: string;
  public sucursales: ISucursalGeneral[] = [];

  public doughnutChartType: string = 'doughnut';

  public doughnutChartColors1: Array<any>;
  public doughnutChartColors2: Array<any>;
  public doughnutChartColors3: Array<any>;

  detalleTitulo: string = 'Sucursales Zonas';
  sumaNivelDeServicio: any = 0;
  sumaAbandonosTotales: any = 0;
  suma: any = 0;

  public doughnutChartOptions: any = {
    legend: {
      labels: {
        fontColor: '#9b9b9b',
        fontFamily: "'Open Sans', sans-serif",
        fontStyle: 'italic',
        fontSize: 14
      }

    },
    events: [
      'onHover'
    ]
  };

  constructor(
    private _sucursal: SucursalService,
    private _zona: ZonasService,
    private activatedRoute: ActivatedRoute,
    private _location: Location,
    private validarService: ValidarTransaccionService
  ) {
    this.intervalo = 180000;
    this.id_zona = localStorage.getItem('idZona');
    this.error = false;
    this.loading = true;

    this.doughnutChartColors1 = this.asignarColor('rgba(73, 118, 46, 1)');
    this.doughnutChartColors2 = this.asignarColor('rgba(11, 92, 137, 1)');
    this.doughnutChartColors3 = this.asignarColor('rgba(255, 159, 64, 1)');
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      // this.id = params.get('id_oficina');
      this.id = sessionStorage.getItem('id_sucursal');
      if (this.id.length  > 0) {
        this.detalleTitulo = 'Detalle Sucursales';
      } else {
        this.detalleTitulo = 'Sucursales Zonas';
      }
    });

    this.refrescarDatos();
    this.listarSucursal(this.id);
    this.traeZona(this.id_zona);
  }

  ngOnDestroy() {
    clearInterval(this.refresca);
  }

  refrescarDatos() {
    clearInterval(this.refresca);
    this.refresca = setInterval(function () {
      this.listarSucursal(this.id);
    }.bind(this), this.intervalo);
  }

  // Trae la información de la zona a la que pertenece la oficina
  async traeZona(id) {
    let data = await this._zona.listarSucursalesZona(id);
    if (data['data'] == '' || data['data'] == undefined) {
      swal('Error', 'Se ha producido un error.', 'error');
    } else {
      if (this.validarService.validarError(data) == 'ok') {
        // const registros = data['data'].split('|');
        const registros = data['data'].substring(14, data['data'].length - 5).split('|');

        // this.nombreZona = registros[0].slice(14);

        let n: number = 0;
        if (id != 0) {
          n = 1;
          this.nombreZona = registros[0];
        } else {
          n = 0;
          this.nombreZona = 'Nacional';
        }

        for (let index = n; index < registros.length; index++) {
          const element = registros[index];
          const registro = element.split('~');
          // const registro = x.split('~');

          let sucursal: ISucursalGeneral = {

            id_sucursal: registro[0],
            nombre_sucursal: registro[1],
            porcentaje_abandono: registro[2],
            nivel_servicio: registro[3],
            porcentaje_actividad: registro[11],
            ejecutivos_atendiendo: registro[8],
            ejecutivos_pausa: registro[9],
            ejecutivos_desconectados: registro[10],
            clientes_espera: registro[4],
            tiempo_max_espera: registro[5],
            tiempo_med_espera: registro[6],
            tiempo_med_atencion: registro[7],
            ticket_emitidos: registro[12],
            clientes_atendidos: registro[13],
            clientes_abandonados: registro[14]
          };

          this.sucursales.push(sucursal);
        }
      } else {
        swal('Error', this.validarService.validarError(data), 'error');
      }
    }
  }

  async listarSucursal(id_sucursal: any) {
    let data = await this._sucursal.listar(id_sucursal);
    if (data['data'] == '' || data['data'] == undefined) {
      swal('Error', 'Se ha producido un error.', 'error');
    } else {
      if (this.validarService.validarError(data) == 'ok') {
        // console.log('Data: ' + JSON.stringify(data['data']));

        if (data['data'].search('OFI') == -1) {

          this.vaciarInterfaceOficina();
          console.log('Error de configuración de oficina.');
          this.error = true;
          this.loading = false;
        } else {
          this.vaciarInterfaceOficina();
          this.servicioAtencion = [];
          this.asistente = [];

          // const registros = data['data'].split('|');
          const registros = data['data'].substring(14, data['data'].length - 5).split('|');

          // this.nombreSucursal = registros[0].slice(14);
          this.nombreSucursal = registros[0];

          for (const registro of registros) {
            if (registro.substring(0,3) == 'OFI') {
              this.splitOficina(registro);
            }
            if (registro.substring(0,3) == 'SER') {
              this.splitServicioAtencion(registro);
              console.log(registro);
            }
            if (registro.substring(0,3) == 'EJE') {
              this.splitAsistenteComercial(registro);
            }
          }
        }
        this.loading = false;
      } else {
        swal('Error', this.validarService.validarError(data), 'error');
      }
    }
  }

  // De la oficina
  splitServicioAtencion(stringServicio) {
    const splitString = stringServicio.split('~');

    let servicioAtencion: IServicioAtencion = {
      id_servicio: splitString[1],
      nombre_servicio: splitString[2],
      clientes_espera: splitString[3],
      // porcentaje_abandono: splitString[4],
      porcentaje_abandono: parseFloat(Number(splitString[4].replace(',', '.')).toFixed(2)),
      nivel_servicio: parseFloat(Number(splitString[5].replace(',', '.')).toFixed(2)),
      tiempo_max_espera: splitString[6],
      tiempo_medio_espera: splitString[7],
      tiempo_max_atencion: splitString[8],
      tiempo_medio_atencion: splitString[9],
      ticket_emitidos: splitString[10],
      clientes_atendidos: splitString[11],
      clientes_abandonados: splitString[12],
      clientes_atendidos_especiales: splitString[13]
    };

    this.servicioAtencion.push(servicioAtencion);

    this.sumaNivelDeServicio = 0;
    this.suma = 0;
    for (let j = 0; j < this.servicioAtencion.length; j++) {
      this.suma = this.suma + this.servicioAtencion[j].nivel_servicio  / parseFloat(this.servicioAtencion.length.toString());
      // console.log(this.servicioAtencion[j].nivel_servicio);
    }

    this.sumaNivelDeServicio = (parseFloat(this.suma.toString()).toFixed(2));

    this.sumaAbandonosTotales = 0;
    let sumaAbandonos = 0;
    for (let j = 0; j < this.servicioAtencion.length; j++) {
      sumaAbandonos = sumaAbandonos + Number(this.servicioAtencion[j].clientes_abandonados);
    }

    this.sumaAbandonosTotales = sumaAbandonos;
  }

  // Ordena la información de los asistentes comerciales de  la oficina
  splitAsistenteComercial(stringAsistente) {
    const splitString = stringAsistente.split('~');

    let ejecutivoInterface: IAsistente = {
      nombre_ejecutivo: splitString[1],
      estado: splitString[2],
      tiempo: splitString[3],
      tiempo_atencion: splitString[4],
      actividad: splitString[5],
      atendidos: splitString[6]
    };

    this.asistente.push(ejecutivoInterface);
  }

  // Ordena la información de la oficina
  splitOficina(stringOficina) {
    const splitString = stringOficina.split('~');

    this.sucursal = {
      clientes_atendidos: splitString[4],
      asistentes_sucursal: splitString[10],
      tiempo_maximo_espera: splitString[9],
      clientes_espera: splitString[5],
      asistentes_atendiendo: splitString[2],
      tiempo_medio_atencion: splitString[7],
      // abandono_total: splitString[1],
      abandono_total: parseFloat(Number(splitString[1].replace(',', '.')).toFixed(2)),
      actividad_asist: splitString[8],
      asistente_pausa: splitString[3],
      tiempo_medio_espera: splitString[6]
    };
  }

  // Actualiza la información de la oficina
  sucursalActual(id: any) {
    this.listarSucursal(id);
  }

  vaciarInterfaceOficina() {
    this.sucursal = {
      clientes_atendidos: null,
      asistentes_sucursal: null,
      tiempo_maximo_espera: null,
      clientes_espera: null,
      asistentes_atendiendo: null,
      tiempo_medio_atencion: null,
      abandono_total: null,
      actividad_asist: null,
      asistente_pausa: null,
      tiempo_medio_espera: null
    };
  }

  volver() {
    this._location.back();
  }

  asignarColor(color: string) {

    let grafico: Array<any>;

    const colorGris: string = '#e0e0e0';

    grafico = [
      {
        backgroundColor: [color, colorGris],
        borderColor: [
          'rgba(255,255,255,1)',
          'rgba(255,255,255,1)'
        ],
        borderWidth: 1
      }
    ];

    return grafico;
  }
}
