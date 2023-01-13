import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

//Componentes Hijos
import { ResumenDeOficinaFormComponent } from './resumen-de-oficina-form/resumen-de-oficina-form.component';
import { SerieRadioComponent } from '../../comun/serie-radio/serie-radio.component'
import { ResumenDeOficinaReporteComponent } from './resumen-de-oficina-reporte/resumen-de-oficina-reporte.component';
import { ResumenDeOficinaTablaComponent } from './resumen-de-oficina-tabla/resumen-de-oficina-tabla.component';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resumen-de-oficina',
  templateUrl: './resumen-de-oficina.component.html',
  styleUrls: ['./resumen-de-oficina.component.css']
})
export class ResumenDeOficinaComponent implements OnInit, AfterViewInit, OnDestroy{
  private subscription: Subscription = new Subscription();
  @ViewChild('form') form:ResumenDeOficinaFormComponent;
  @ViewChild('tabla') tabla:ResumenDeOficinaTablaComponent;
  @ViewChild('series') series:SerieRadioComponent;
  @ViewChild('reporte') reporte:ResumenDeOficinaReporteComponent;

  mostrarFormulario: boolean = true;
  mostrarSerie: boolean = true;
  mostrarTabla: boolean = true;
  mostrarReporte: boolean = false;


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.subscription.add(
      this.reporte.btnVolver.subscribe(data => {
        this.mostrarFormulario = true;
        this.mostrarSerie = true;
        this.mostrarTabla = true;
        this.mostrarReporte = false;
      })
    );
    this.subscription.add(
      this.series.SerieEvent.subscribe(data => {
        this.tabla.serie = data;
      })
    );
    this.subscription.add(
      this.tabla.getForm.subscribe(data => {
        this.tabla.fechaInicial = this.form.fechaInicial;
        this.tabla.fechaFinal = this.form.fechaFinal;
        this.tabla.horaInicial = this.form.horaInicial;
        this.tabla.horaFinal = this.form.horaFinal;
        this.tabla.horaInicial2 = this.form.horaInicial2;
        this.tabla.horaFinal2 = this.form.horaFinal2;
        this.tabla.intervalo = this.form.intervalo;
        this.form.obtenerDias();
        this.tabla.dias = this.form.dias;
      })
    );
    this.subscription.add(
      this.tabla.informacionReporte.subscribe(async data => {
        this.reporte.gifCarga = true;
        await this.reporte.cargarDatos(data);
        this.mostrarFormulario = false;
        this.mostrarSerie = false;
        this.mostrarTabla = false;
        this.mostrarReporte = true;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
