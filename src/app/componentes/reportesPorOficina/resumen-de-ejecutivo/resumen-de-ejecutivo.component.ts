import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

//Componentes Hijos
import { ResumenDeEjecutivoFormComponent } from './resumen-de-ejecutivo-componentes/resumen-de-ejecutivo-form/resumen-de-ejecutivo-form.component';
import { ResumenDeEjecutivoReporteComponent } from './resumen-de-ejecutivo-componentes/resumen-de-ejecutivo-reporte/resumen-de-ejecutivo-reporte.component';
import { ResumenDeEjecutivoTablaComponent } from './resumen-de-ejecutivo-componentes/resumen-de-ejecutivo-tabla/resumen-de-ejecutivo-tabla.component';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resumen-de-ejecutivo',
  templateUrl: './resumen-de-ejecutivo.component.html',
  styleUrls: ['./resumen-de-ejecutivo.component.css']
})
export class ResumenDeEjecutivoComponent implements OnInit, AfterViewInit, OnDestroy{
  private subscription: Subscription = new Subscription();
  @ViewChild('formulario') formulario:ResumenDeEjecutivoFormComponent;
  @ViewChild('reporte') reportes:ResumenDeEjecutivoReporteComponent;
  @ViewChild('tabla') tabla:ResumenDeEjecutivoTablaComponent;

  mostrarForm:boolean = true;
  mostrarTabla:boolean = true;
  mostrarReporte:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.subscription.add(
      this.tabla.getDate.subscribe(data => {
        this.tabla.fechaMin = this.formulario.fechaDesde;
        this.tabla.fechaMax = this.formulario.fechaHasta;
      })
    );
    this.subscription.add(
      this.tabla.informacionOficina.subscribe(data => {
        this.mostrarForm = false;
        this.mostrarTabla = false;
        this.mostrarReporte = true;
        this.reportes.datosReporte = data;
        this.reportes.gifCarga = true;
        this.reportes.mostrarDatos();
      })
    );
    this.subscription.add(
      this.reportes.btnVolver.subscribe(data => {
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
