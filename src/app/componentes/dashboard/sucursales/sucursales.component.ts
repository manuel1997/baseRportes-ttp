import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

// Services
import { ZonasService } from '../../../servicios/zonas.service';

// Interfaces
import { ISucursalGeneral } from '../../../interfaces/sucursalGeneral';
import swal from 'sweetalert2';
import { ValidarTransaccionService } from '../../../servicios/validar-transaccion.service';


@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {
  public id_sucursal: number;

  public loading: boolean;
  public errorSinDatos: boolean;

  public sucursales: Array<ISucursalGeneral>;
  public sucursalActual: ISucursalGeneral;

  public intervalo: number;
  private refresca: any = null;

  public id: any;
  public nombreZona: string;
  public nombreSucursal: string;

  constructor(
    private _zonas: ZonasService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private validarService: ValidarTransaccionService
  ) {

    this.intervalo = 180000;
    this.errorSinDatos = false;
    this.loading = true;
  }

  ngOnInit() {
    this.id = Number(sessionStorage.getItem('id_zona'));

    this.refrescarDatos();
    this.listarSucursales(this.id);

    console.log('ID' + this.id);
  }

  ngOnDestroy() {
    clearInterval(this.refresca);
  }

  /* Actualiza los datos desde el socket */
  refrescarDatos() {
    clearInterval(this.refresca);
    this.refresca = setInterval(function () {
      this.actualizarSucursalActual(this.id_sucursal);
    }.bind(this), this.intervalo);
  }

  /* Guarda las sucursales de una oficina dentro de un arreglo () */
  async listarSucursales(id: any) {
    let data = await this._zonas.listarSucursalesZona(id);
    if (data['data'] == '' || data['data'] == undefined) {
      swal('Error', 'Se ha producido un error.', 'error');
    } else {
      if (this.validarService.validarError(data) == 'ok') {
        let atendiendo = 0;
        let pausa = 0;
        let desconectados = 0;
        let atendidos = 0;
        let abandonados = 0;
        let espera = 0;
        // const zona = 0;
        // const nombre = 'Nacional';
        let p_abandono = 0;
        let p_actividad = 0;
        let p_nivel_servicio = 0;
        let atencion_promedio = 0;
        let max_espera = 0;
        let espera_promedio = 0;
        let emitidos = 0;

        this.sucursales = [];

        // const registros = data['data'].split('|');
        const registros = data['data'].substring(14, data['data'].length - 5).split('|');

        if (registros.length < 1) {

          this.errorSinDatos = true;
          this.loading = false;

        } else {

          // this.nombreZona = registros[0].slice(14);

          let n: number = 0;
          if (id != 0) {
            n = 1;
            this.nombreZona = registros[0];
            this.nombreSucursal = 'Sucursales';
          } else {
            n = 0;
            this.nombreZona = 'Nacional';
            this.nombreSucursal = 'Zonas';
          }

          console.log(registros);

          for (let index = n; index < registros.length; index++) {
            const element = registros[index];
            const registro = element.split('~');

            let clientes_abandonados_valor = '';
            clientes_abandonados_valor = registro[14];

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
              clientes_abandonados: parseInt(clientes_abandonados_valor)
            };

            this.sucursales.push(sucursal);
          }

          if (this.id === 0) {
            for (let i = 0; i < this.sucursales.length; i++) {
              atendiendo += Number(this.sucursales[i].ejecutivos_atendiendo);
              pausa += Number(this.sucursales[i].ejecutivos_pausa);
              desconectados += Number(this.sucursales[i].ejecutivos_desconectados);
              atendidos += Number(this.sucursales[i].clientes_atendidos);
              abandonados += Number(this.sucursales[i].clientes_abandonados);
              espera += Number(this.sucursales[i].clientes_espera);
              // p_abandono += parseFloat(this.sucursales[i].porcentaje_abandono);
              // p_actividad += parseFloat(this.sucursales[i].porcentaje_actividad);
              // p_nivel_servicio += parseFloat(this.sucursales[i].nivel_servicio);
              p_abandono += parseFloat(this.sucursales[i].porcentaje_abandono) / this.sucursales.length;
              p_actividad += parseFloat(this.sucursales[i].porcentaje_actividad) / this.sucursales.length;
              p_nivel_servicio += parseFloat(this.sucursales[i].nivel_servicio) / this.sucursales.length;
              atencion_promedio += Number(this.sucursales[i].tiempo_med_atencion) / this.sucursales.length;
              espera_promedio += Number(this.sucursales[i].tiempo_med_espera) / this.sucursales.length;
              max_espera += Number(this.sucursales[i].tiempo_max_espera) / this.sucursales.length;
              emitidos += Number(this.sucursales[i].ticket_emitidos);
            }

            const sucursales: ISucursalGeneral = {
              id_sucursal: 0,
              nombre_sucursal: 'Nacional',
              // porcentaje_abandono: (p_abandono / this.sucursales.length).toFixed(2),
              // nivel_servicio: (p_nivel_servicio / this.sucursales.length).toFixed(2),
              // porcentaje_actividad: (p_actividad / this.sucursales.length).toFixed(2),
              porcentaje_abandono: p_abandono,
              nivel_servicio: p_nivel_servicio,
              porcentaje_actividad: p_actividad,
              ejecutivos_atendiendo: atendiendo,
              ejecutivos_pausa: pausa,
              ejecutivos_desconectados: desconectados,
              clientes_espera: espera,
              tiempo_max_espera: max_espera,
              tiempo_med_espera: espera_promedio,
              tiempo_med_atencion: atencion_promedio,
              ticket_emitidos: emitidos,
              clientes_atendidos: atendidos,
              clientes_abandonados: abandonados
            };

            this.sucursales.push(sucursales);
            this.sucursales.sort((a, b) => b.id_sucursal < a.id_sucursal ? 1 : -1);
          }
          this.sucursalActual = this.sucursales[0];
          console.log(this.sucursales);
          sessionStorage.setItem('id_sucursal', this.sucursalActual.id_sucursal.toString());
          this.id_sucursal = this.sucursalActual.id_sucursal;
        }
      } else {
        swal('Error', this.validarService.validarError(data), 'error');
      }
    }
    this.loading = false;
  }

  actualizarSucursalActual(id_sucursal) {
    for (let sucursal of this.sucursales) {
      if (sucursal.id_sucursal == id_sucursal) {
        this.sucursalActual = sucursal;
        sessionStorage.setItem('id_sucursal', sucursal.id_sucursal.toString());
      }
    }
  }

  informacionSucursal(id_sucursal: any) {
    localStorage.removeItem('idZona');
    localStorage.setItem('idZona', this.id);
    this.router.navigate(['/dashboard_sucursal']);
  }

  volver() {
    this._location.back();
  }
}
