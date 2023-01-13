import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

//Componentes
import { SerieRadioComponent } from '../../comun/serie-radio/serie-radio.component';

//Componentes Hijos
import { ProduccionFormComponent } from './produccion-componentes/produccion-form/produccion-form.component';
import { ProduccionReporteComponent } from './produccion-componentes/produccion-reporte/produccion-reporte.component';
import { ProduccionTablaComponent } from './produccion-componentes/produccion-tabla/produccion-tabla.component';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.css']
})
export class ProduccionComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('series')series : SerieRadioComponent;
  @ViewChild('formulario') formulario: ProduccionFormComponent;
  @ViewChild('tabla') tabla: ProduccionTablaComponent;

  @ViewChild('reporte') reporte: ProduccionReporteComponent;

  serie:string;
  consulta:any[] = [];

  mostrarForm:boolean = true;
  mostrarSeries:boolean = true;
  mostrarTabla:boolean = true;
  mostrarReporte:boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.subscription.add(
      this.series.SerieEvent.subscribe(data => {
        this.tabla.serie = data;
      })
    );
    this.subscription.add(
      this.formulario.formulario.subscribe(data=>{
        this.tabla.consulta = data;
      })
    );
    this.subscription.add(
      this.tabla.informacionReporte.subscribe(async data => {
        this.mostrarForm = false;
        this.mostrarSeries = false;
        this.mostrarTabla = false;
        this.mostrarReporte = true;
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
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
