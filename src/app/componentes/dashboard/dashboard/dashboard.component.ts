import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ZonasComponent } from '../zonas/zonas.component';
import { OficinaStatusTablaComponent } from '../../reporte-oficina-online/reporte-oficina-componentes/oficina-status-tabla/oficina-status-tabla.component';
import { OficinaStatusDetallesComponent } from './../../reporte-oficina-online/reporte-oficina-componentes/oficina-status-detalles/oficina-status-detalles.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('zonas') zonas: ZonasComponent;
  @ViewChild('sucursales') sucursales: OficinaStatusTablaComponent;
  @ViewChild('detalles') detalles: OficinaStatusDetallesComponent;

  mostrarZonas = true;
  mostrarReporte = false;
  mostrarDetalles = false;

  constructor() { }

  async ngOnInit() {
    await this.zonas.refrescarDatos();
    await this.zonas.listarZonas();

    await this.sucursales.cargarDatos();

    this.zonas.emitParams.subscribe(async res => {
      this.sucursales.dataShared = res;
      this.sucursales.gifCarga = true;
      await this.sucursales.cargarDatos();
      this.mostrarZonas = false;
      this.mostrarReporte = true;
      this.mostrarDetalles = false;
    });

    this.sucursales.btnVolver.subscribe(() => {
      this.mostrarZonas = true;
      this.mostrarReporte = false;
      this.mostrarDetalles = false;
    });
  }

  ngAfterViewInit() {
    this.sucursales.dataDetalle.subscribe(res => {
      this.detalles.dataDetalle = res;
      this.detalles.cargarDatos();
      this.mostrarZonas = false;
      this.mostrarReporte = false;
      this.mostrarDetalles = true;
    });
    this.detalles.btnVolver.subscribe(data => {
      this.mostrarZonas = false;
      this.mostrarReporte = true;
      this.mostrarDetalles = false;
    });
  }
}
