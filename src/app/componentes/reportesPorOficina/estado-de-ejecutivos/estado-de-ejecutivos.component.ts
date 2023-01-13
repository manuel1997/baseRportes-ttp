import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

//Componentes Hijos
import { EstadoDeEjecutivosFormComponent } from './estado-de-ejecutivos-componentes/estado-de-ejecutivos-form/estado-de-ejecutivos-form.component';
import { EstadoDeEjecutivosTablaComponent } from './estado-de-ejecutivos-componentes/estado-de-ejecutivos-tabla/estado-de-ejecutivos-tabla.component';
import { EstadoDeEjecutivosReporteComponent } from './estado-de-ejecutivos-componentes/estado-de-ejecutivos-reporte/estado-de-ejecutivos-reporte.component';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estado-de-ejecutivos',
  templateUrl: './estado-de-ejecutivos.component.html',
  styleUrls: ['./estado-de-ejecutivos.component.css']
})
export class EstadoDeEjecutivosComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('formulario') formulario:EstadoDeEjecutivosFormComponent;
  @ViewChild('tabla') tabla:EstadoDeEjecutivosTablaComponent;
  @ViewChild('reporte') reporte: EstadoDeEjecutivosReporteComponent;

  mostrarForm:boolean = true;
  mostrarTabla:boolean = true;
  mostrarReporte:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.subscription.add(
      this.tabla.getForm.subscribe(res => {
        this.tabla.dia = this.formulario.dia;
        this.tabla.intervalo = this.formulario.intervalo;
        this.tabla.horaInicial = this.formulario.horaInicial;
        this.tabla.horaFinal = this.formulario.horaFinal;
      })
    );
    this.subscription.add(
      this.tabla.dataReporte.subscribe(res => {
        this.mostrarForm = false;
        this.mostrarTabla = false;
        this.mostrarReporte = true;
        this.reporte.horaInicio = Number(this.formulario.horaInicial);
        this.reporte.horaFin = Number(this.formulario.horaFinal);
        this.reporte.intervalo = Number(this.formulario.intervalo);
        this.reporte.datosReporte = res;
        this.reporte.gifCarga = true;
        this.reporte.cargarDatos();
      })
    );
    this.subscription.add(
      this.reporte.btnVolver.subscribe(data => {
        this.mostrarForm = true;
        this.mostrarTabla = true;
        this.mostrarReporte = false;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
