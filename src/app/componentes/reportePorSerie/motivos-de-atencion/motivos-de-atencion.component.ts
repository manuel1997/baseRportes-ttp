import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

//Componenetes Hijos

import { MotivosDeAtencionFormComponent } from './motivos-de-atencion-form/motivos-de-atencion-form.component';
import { SerieRadioComponent } from '../../comun/serie-radio/serie-radio.component';
import { MotivosDeAtencionTablaComponent } from './motivos-de-atencion-tabla/motivos-de-atencion-tabla.component';
import { MotivosDeAtencionReporteComponent } from './motivos-de-atencion-reporte/motivos-de-atencion-reporte.component';
import { MotivosDeAtencionGraficoComponent } from './motivos-de-atencion-grafico/motivos-de-atencion-grafico.component';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-motivos-de-atencion',
  templateUrl: './motivos-de-atencion.component.html',
  styleUrls: ['./motivos-de-atencion.component.css']
})
export class MotivosDeAtencionComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild("form") form:MotivosDeAtencionFormComponent;
  @ViewChild("series") series:SerieRadioComponent;
  @ViewChild("tabla") tabla:MotivosDeAtencionTablaComponent;
  @ViewChild("reporte") reporte:MotivosDeAtencionReporteComponent;
  @ViewChild("grafico") grafico:MotivosDeAtencionGraficoComponent;

  mostrarForm:boolean = true;
  mostrarSeries:boolean = true;
  mostrarTabla:boolean = true;
  mostrarReporte:boolean = false;
  mostrarGrafico:boolean = false;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.subscription.add(
      this.series.SerieEvent.subscribe(data => {
        this.tabla.serie = data;
      })
    );
    this.subscription.add(
      this.tabla.getForm.subscribe(data => {
        this.tabla.fechaMin = this.form.fechaDesde;
        this.tabla.fechaMax = this.form.fechaHasta;
      })
    );
    this.subscription.add(
      this.tabla.informacionReporte.subscribe(async data => {
        this.mostrarForm = false;
        this.mostrarSeries = false;
        this.mostrarTabla = false;
        this.mostrarReporte = true;
        this.mostrarGrafico = false;
        this.reporte.gifCarga = true;
        await this.reporte.cargarDatos(data);
      })
    );
    this.subscription.add(
      this.reporte.btnVolver.subscribe(data => {
        this.mostrarForm = true;
        this.mostrarSeries = true;
        this.mostrarTabla = true;
        this.mostrarReporte = false;
        this.mostrarGrafico = false;
      })
    );
    this.subscription.add(
      this.tabla.informacionGrafico.subscribe(async data => {
        this.grafico.gifCarga = true;
        this.grafico.datosReporte = data;
        await this.grafico.mostrarDatos();
        this.mostrarForm = false;
        this.mostrarSeries = false;
        this.mostrarTabla = false;
        this.mostrarReporte = false;
        this.mostrarGrafico = true;
      })
    );
    this.subscription.add(
      this.grafico.btnVolver.subscribe(data => {
        this.mostrarForm = true;
        this.mostrarTabla = true;
        this.mostrarReporte = false;
        this.mostrarGrafico = false;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
