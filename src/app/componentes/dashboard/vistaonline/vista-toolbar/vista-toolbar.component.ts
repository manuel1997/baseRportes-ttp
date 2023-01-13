import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IVista } from '../../../../interfaces/vistaonline/vistaonline';
import { ISucursal } from '../../../../interfaces/sucursal';
import { VistaonlineService } from '../../../../servicios/vistaonline/vistaonline.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-toolbar',
  templateUrl: './vista-toolbar.component.html',
  styleUrls: ['./vista-toolbar.component.css']
})
export class VistaToolbarComponent implements OnInit {
  @Input() escritorios: any = [];

  @Output() emitEvent: EventEmitter<String> = new EventEmitter<String>();
  @Output() oficina: EventEmitter<String> = new EventEmitter<String>();

  iVista: IVista = {
    usuario: localStorage.getItem('repousuario'),
    password: localStorage.getItem('repopassword'),
    id_usuario: Number(localStorage.getItem('repoid_usuario')),
    id_oficina: null,
    nombre_oficina: null,
    max_cliente: null
  };

  iOficinaSeleccionada: IVista = {
    usuario: localStorage.getItem('repousuario'),
    password: localStorage.getItem('repopassword'),
    id_usuario: Number(localStorage.getItem('repoid_usuario')),
    id_oficina: Number(localStorage.getItem('repooficinaSeleccionada'))
  };

  iSucursalDetalles: ISucursal = {
    usuario: localStorage.getItem('repousuario'),
    password: localStorage.getItem('repopassword'),
    estado_oficina: null,
    hora_servidor: null,
    id_usuario: Number(localStorage.getItem('repoid_usuario')),
    id_oficina: Number(localStorage.getItem('repooficinaSeleccionada'))
  };

  rows: IVista[] = [];
  public intervalo: number;
  public refresca: any = null;
  gifCarga = true;

  constructor(private _vistaonlineService: VistaonlineService) {
    this.intervalo = 60000;
  }

  ngOnInit() {
    this.refrescarDatos();
    this.cargarOficinas();
    this.detalleOficina();

    this.iOficinaSeleccionada.id_oficina = '';
  }

  ngOnDestroy() {
    clearInterval(this.refresca);
  }

  async cargarOficinas() {
    this.rows.length = 0;
    this.rows = [];
    const response = await this._vistaonlineService.listarOficinas(this.iVista);
    if (response['data'] == '' || response['data'] == undefined) {
      Swal('Error', 'Se ha producido un error con el listado de oficinas.', 'error');
    } else {
      if (response['data'] !== '') {
        const datos = response['data'].substring(14, response['data'].length - 5).split('|');
        for (let i = 0; i < datos.length; i++) {
          const registro = datos[i].split('~');
          const oficinas: IVista = {
            usuario: null,
            password: null,
            id_usuario: null,
            id_oficina: registro[0],
            nombre_oficina: registro[1]
          };
          this.rows.push(oficinas);
        }
      } else {
        // console.log('vacio');
        // console.log('row: '+ this.rows);
      }

    }
    this.gifCarga = false;

    // console.log(this.rows);
  }

  async detalleOficina() {
    if (this.iOficinaSeleccionada.id_oficina !== 0) {
      let response = await this._vistaonlineService.detalleOficina(this.iOficinaSeleccionada);
      if (response['data'] === '' || response['data'] === undefined) {
        Swal('Error', 'Se ha producido un error con el detalle de las oficinas.', 'error');
      } else {
        const datos = response['data'].split('|');
        const info = datos[0].split('~');
        this.iSucursalDetalles.estado_oficina = info[2] !== '' && info[2] !== undefined ? this.titleCase(info[2]) : '--';
        this.iSucursalDetalles.hora_servidor = info[3] !== '' && info[3] !== undefined ? info[3].substring(0, 8) : '--';
      }
    } else {
      this.iSucursalDetalles.estado_oficina = '';
      this.iSucursalDetalles.hora_servidor = '';
    }
  }

  selectOficina(id) {
    localStorage.removeItem('repooficinaSeleccionada');
    localStorage.setItem('repooficinaSeleccionada', id);

    this.emitEvent.emit('refrescar');
    this.oficina.emit(id);
    this.detalleOficina();
  }

  /* refrescarDatos() {
    clearInterval(this.refresca);
    this.refresca = setInterval(function () {
      this.cargarOficinas();
      this.detalleOficina();
      let id = localStorage.getItem('oficinaSeleccionada');
      if (id) {
        this.oficina.emit(id);
      }
    }.bind(this), this.intervalo);
  } */

  refrescarDatos() {
    clearInterval(this.refresca);
    this.refresca = setInterval(async() => {
      await this.cargarOficinas();
      await this.detalleOficina();
      let id = localStorage.getItem('repooficinaSeleccionada');
      if (id) {
        this.oficina.emit(id);
      }
    }, this.intervalo);
  }

  titleCase(string: string) {
    if (string !== '' && string !== undefined) {
      const splitStr = string.toLowerCase().split(' ');
      for (let i = 0; i < splitStr.length; i++) {
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(' ');
    }
  }
}
