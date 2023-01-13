import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { VistaToolbarComponent } from '../vista-toolbar/vista-toolbar.component';
import { MotivosAtencionComponent } from '../motivos-atencion/motivos-atencion.component';
import { IVistaOnline } from '../../../../interfaces/vistaonline/vista';
import { VistaonlineService } from '../../../../servicios/vistaonline/vistaonline.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-online',
  templateUrl: './vista-online.component.html',
  styleUrls: ['./vista-online.component.css']
})
export class VistaOnlineComponent implements OnInit {
  @ViewChild('toolbar') toolbar: VistaToolbarComponent;
  @ViewChild('motivos') motivos: MotivosAtencionComponent;

  esc: any[] = [];
  esc_tmp: any[] = [];
  arr_escritorios: any[] = [];
  clientes: any[] = [];
  gifCarga = true;

  iVistaOnline: IVistaOnline = {
    usuario: localStorage.getItem('repousuario'),
    password: localStorage.getItem('repopassword'),
    id_usuario: Number(localStorage.getItem('repoid_usuario')),
    id_oficina: null,
    nombre_oficina: null,
    max_cliente: 0,
    nombre_servicio: null,
    id_servicio: null,
    letra_servicio: null,
    alarma_espera: null,
    alarma_atencion: null,
    string_escritorios: null,
    cantidad_clientes: null,
    tiempo_promedio: null,
    tiempo_maximo: null,

    escritorios: this.esc,
    clientes: this.clientes
  };

  @Input() dataShared = '';
  @Input() oficina = '';

  constructor(private _vistaonlineService: VistaonlineService, private _location: Location,) { }

  rows_servicios: any[] = [];
  rows_escritorios: any[] = [];
  rows_clientes: any[] = [];
  escritorios: any[] = [];
  asistentes: any[] = [];
  clienteslist: any[] = [];
  rows_ejecutivos: any[] = [];
  promedio: any = 0;
  cantidad_ejecutivos: any = 0;
  tiempo_maximo: any = [];

  oficinaInicial: any = localStorage.getItem('repooficinaSeleccionada');

  ngOnInit() {

      this.toolbar.oficina.subscribe(res => {
        this.motivos.office = res;
        this.motivos.gifCarga = true;
        this.motivos.loadFullData();
        this.cargarServicios(res);
      });

      this.cargarServicios(localStorage.getItem('repooficinaSeleccionada'));

  }

  ngAfterViewInit() {
    this.toolbar.oficina.subscribe(res => {
      this.toolbar.gifCarga = true;
      this.toolbar.cargarOficinas();
    });
  }

  async cargarServicios(oficina: any) {
    this.clientes = [];
    this.esc = [];
    this.esc_tmp = [];

    this.rows_servicios = [];
    this.rows_escritorios = [];
    this.rows_clientes = [];
    this.escritorios = [];
    this.asistentes = [];
    this.clienteslist = [];
    this.rows_ejecutivos = [];

    this.clientes.length = 0;
    this.esc.length = 0;
    this.esc_tmp.length = 0;

    this.iVistaOnline = {
      usuario: localStorage.getItem('repousuario'),
      password: localStorage.getItem('repopassword'),
      id_usuario: Number(localStorage.getItem('repoid_usuario')),
      id_oficina: oficina,
      nombre_oficina: null,
      max_cliente: 0,
      nombre_servicio: null,
      id_servicio: null,
      letra_servicio: null,
      alarma_espera: null,
      alarma_atencion: null,
      string_escritorios: null,
      cantidad_clientes: null,
      tiempo_promedio: null,
      tiempo_maximo: null,
      escritorios: this.esc,
      clientes: this.clientes
    };

    let data = await this._vistaonlineService.detalleOficina(this.iVistaOnline);
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error con detalle oficinas.', 'error');
    } else {
      const datos = data['data'].substring(14, data['data'].length - 5).split('|'); //console.log(datos);

      const ser = datos.filter(data => data.split('~')[0] == 'SER');

      const esc = datos.filter(data => data.split('~')[0] == 'ESC');

      ser.forEach((e1)=> {
        const registros = e1.split('~');
        const vista: IVistaOnline = {
          usuario: null,
          password: null,
          id_usuario: null,
          id_oficina: null,
          nombre_oficina: null,
          max_cliente: 0,
          nombre_servicio: this.titleCase(registros[3]),
          id_servicio: registros[1],
          letra_servicio: registros[2],
          alarma_espera: this.minuto(registros[4]),
          alarma_atencion: this.minuto(registros[5]),
          string_escritorios: registros[6]
        };
        this.rows_servicios.push(vista);
      });

      esc.forEach((e2)=> {
        const registros = e2.split('~');
        this.esc_tmp.push({
          'id': registros[1],
          'estado': '',
          'nombre': '',
          'cantidad_atendidos': '',
          'tiempo_promedio': '',
          'pausa': '',
          'hora_pausa': '',
          'hora_llamado': '',
          'turno': '',
          'rut_cliente': '',
          'nombre_cliente': '',
          'id_servicio': '',
          'nombre_servicio': 'No asignado',
        });
      });
    }

    let data1 = await this._vistaonlineService.listarVista(this.iVistaOnline);
    if (data1['data'] == '' || data1['data'] == undefined) {
      Swal('Error', 'Se ha producido un error con información de ejecutivos.', 'error');
    } else {
      const datos = data1['data'].substring(14, data1['data'].length - 5).split('|');
      // console.log(datos);

      const esc = datos.filter(data1 => data1.split('~')[0] == 'ESC');

      const cli = datos.filter(data1 => data1.split('~')[0] == 'CLI');

      esc.forEach((e1)=> {
        const registros = e1.split('~');
        this.rows_escritorios.push({
          'id': registros[2],
          'estado': registros[3],
          'nombre': this.titleCase(registros[4]),
          'cantidad_atendidos': registros[5],
          'tiempo_promedio': registros[6],
          'pausa': registros[7],
          'hora_pausa': registros[8],
          'hora_llamado': registros[11],
          'turno': registros[13],
          'rut_cliente': registros[14],
          'nombre_cliente': this.titleCase(registros[15]),
          'id_servicio': registros[1],
          'nombre_servicio': ''
        });
      });

      cli.forEach((e2)=> {
        const registros = e2.split('~');
        // console.log('Registros: ' + JSON.stringify(registros));
        this.rows_clientes.push({
          'idser': registros[1],
          'idserH': registros[2],
          'turno': registros[3],
          'idserO': registros[4],
          'turnoO': registros[5],
          'hora': registros[6],
          'rut': registros[7],
          'nombre': this.titleCase(registros[8]),
          'valor': registros[9],
          'tiempoEspera': registros[11]
        });
      });

      this.rows_escritorios.sort(function(a, b) { return a.id - b.id });

      let array_escritorios = this.rows_escritorios;
      let array_servicios = this.rows_servicios;

      this.esc_tmp.forEach((a1)=>{
        const servicio: any[] = [];
        array_escritorios.forEach((a2)=>{
          if (a1.id === a2.id) {
            servicio.push({'id':a2.id_servicio, 'estado': a2.estado});
            a1.estado = a2.estado;
          }
          a1.id_servicio = servicio;
        })
      });
      this.esc_tmp.forEach((a3)=> {
        let servicios = a3.id_servicio;
        servicios.forEach((e5)=>array_servicios.forEach((e6)=>{
          if ( e6.id_servicio == e5.id ) {
            e5.nombre_servicio = e6.nombre_servicio;
          }
        }))
        a3.id_servicio = Object.values(servicios.reduce((acc, cur) => Object.assign(acc, {[cur.id]: cur}), {}));
      });

      this.arr_escritorios = this.esc_tmp;

      this.rows_servicios.forEach((e3)=> {
        this.asistentes.length = 0;
        this.tiempo_maximo.length = 0;
        this.escritorios = e3.string_escritorios.split(',');

        this.escritorios.forEach((e5)=>this.rows_escritorios.forEach((e6)=>{
          if (e6.id === e5.trim()) {
            this.asistentes.push({
              'nombre_ejecutivo': e6.nombre,
              'id_escritorio': e6.id,
              'estado': e6.estado,
              'atendidos': e6.cantidad_atendidos,
              'tiempo': this.minuto(e6.tiempo_promedio),
              'pausa': e6.pausa,
              'hora_pausa': e6.hora_pausa,
              'hora_llamado': e6.hora_llamado,
              'turno': e6.turno,
              'rut_cliente': e6.rut_cliente,
              'nombre_cliente': e6.nombre_cliente,
              'id_servicio': e6.id_servicio,
            });
            this.cantidad_ejecutivos++;
            this.promedio += Number(e6.tiempo_promedio);
            this.tiempo_maximo.push(Number(e6.tiempo_promedio));
          }
        }));

        this.esc = this.asistentes.filter(cli => cli.id_servicio === e3.id_servicio);
        e3.escritorios = Object.values(this.esc.reduce((acc, cur) => Object.assign(acc, {[cur.id_escritorio]: cur}), {}));

        e3.tiempo_promedio = this.minuto(Math.ceil(this.promedio / this.cantidad_ejecutivos));
        e3.tiempo_maximo = this.minuto(Math.max(...this.tiempo_maximo));
        this.promedio = 0;
        this.cantidad_ejecutivos = 0;

        this.clienteslist = [];

        this.clienteslist = this.rows_clientes.filter(cli => cli.idser === e3.id_servicio);

        e3.clientes = this.clienteslist;
        e3.cantidad_clientes = e3.clientes.length;

      });

    }
    // console.log(this.rows_servicios);
    this.gifCarga = false;
  }

  titleCase(string: string) {
    // const splitStr = string.toLowerCase().split(' ');
    // for (let i = 0; i < splitStr.length; i++) {
    //     splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    // }
    // return splitStr.join(' ');

    if (string !== '' && string !== undefined) {
      const splitStr = string.toLowerCase().split(' ');
      for (let i = 0; i < splitStr.length; i++) {
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(' ');
    }
  }

  minuto(value) {
    let resp;
    return resp = ((Math.floor(value / 60) !== 0) && (Math.floor(value / 60) < 10) ? '0' + Math.floor(value / 60) : Math.floor(value / 60))
    + ':' + ((value % 60 < 10) ? '0'
    + value % 60 : value % 60);
  }

  segundo(value) {
    const a = value.split(':');

    const seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    return seconds;
  }

  volver() {
    this._location.back();
  }
}
