import { Component, OnInit, ViewChild, EventEmitter, OnDestroy } from '@angular/core';

//Componentes hijos
import { SerieRadioComponent } from '../../comun/serie-radio/serie-radio.component'
import { CargaDeTrabajoDiariaFormComponent } from './carga-de-trabajo-diaria-form/carga-de-trabajo-diaria-form.component';
import { CargaDeTrabajoDiariaTablaComponent } from './carga-de-trabajo-diaria-tabla/carga-de-trabajo-diaria-tabla.component';
import { CargaDeTrabajoDiariaReporteComponent } from './carga-de-trabajo-diaria-reporte/carga-de-trabajo-diaria-reporte.component';
import { CargaDeTrabajoDiariaGraficoComponent } from './carga-de-trabajo-diaria-grafico/carga-de-trabajo-diaria-grafico.component';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carga-de-trabajo-diaria',
  templateUrl: './carga-de-trabajo-diaria.component.html',
  styleUrls: ['./carga-de-trabajo-diaria.component.css']
})
export class CargaDeTrabajoDiariaComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('form') form: CargaDeTrabajoDiariaFormComponent;
  @ViewChild('series') series: SerieRadioComponent;
  @ViewChild('tabla') tabla: CargaDeTrabajoDiariaTablaComponent;
  @ViewChild('reporte') reporte: CargaDeTrabajoDiariaReporteComponent;
  @ViewChild('grafico') grafico: CargaDeTrabajoDiariaGraficoComponent;

  mostrarForm: boolean = true;
  mostrarSeries: boolean = true;
  mostrarTabla: boolean = true;
  mostrarReporte: boolean = false;
  mostrarGrafico: boolean = false;

  constructor() { }

  ngOnInit() {
    this.subscription.add(
      this.series.SerieEvent.subscribe(data => {
        this.form.serie = data;
      })
    );
    this.subscription.add(
      this.tabla.getForm.subscribe(data => {
        this.tabla.fecha = this.form.fecha;
        this.tabla.horaInicial = this.form.horaInicial;
        this.tabla.horaFinal = this.form.horaFinal;
        this.tabla.intervalo = this.form.intervalo;
        this.tabla.serie = this.form.serie;
      })
    );
    this.subscription.add(
      this.tabla.informacionReporte.subscribe(async data => {
        this.reporte.gifCarga = true;
        await this.reporte.cargarDatos(data);
        this.mostrarForm = false;
        this.mostrarSeries = false;
        this.mostrarTabla = false;
        this.mostrarGrafico = false;
        this.mostrarReporte = true;
      })
    );
    this.subscription.add(
      this.tabla.informacionGrafico.subscribe(async data => {
        this.grafico.gifCarga = true;
        await this.grafico.cargarDatos(data);
        this.mostrarForm = false;
        this.mostrarSeries = false;
        this.mostrarTabla = false;
        this.mostrarGrafico = true;
        this.mostrarReporte = false;
      })
    );
    this.subscription.add(
      this.reporte.btnVolver.subscribe(data => {
        this.mostrarForm = true;
        this.mostrarSeries = true;
        this.mostrarTabla = true;
        this.mostrarGrafico = false;
        this.mostrarReporte = false;
      })
    );
    this.subscription.add(
      this.grafico.btnVolver.subscribe(data => {
        this.mostrarForm = true;
        this.mostrarSeries = true;
        this.mostrarTabla = true;
        this.mostrarGrafico = false;
        this.mostrarReporte = false;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
