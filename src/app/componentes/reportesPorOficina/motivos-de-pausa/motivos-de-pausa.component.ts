import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

//Componentes hijos
import { MotivosDePausaFormComponent } from './motivos-de-pausa-componentes/motivos-de-pausa-form/motivos-de-pausa-form.component';
import { MotivosDePausaTablaComponent } from './motivos-de-pausa-componentes/motivos-de-pausa-tabla/motivos-de-pausa-tabla.component';
import { MotivosDePausaReporteComponent } from './motivos-de-pausa-componentes/motivos-de-pausa-reporte/motivos-de-pausa-reporte.component';
import { MotivosDePausaGraficosComponent } from './motivos-de-pausa-componentes/motivos-de-pausa-graficos/motivos-de-pausa-graficos.component';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-motivos-de-pausa',
  templateUrl: './motivos-de-pausa.component.html',
  styleUrls: ['./motivos-de-pausa.component.css']
})
export class MotivosDePausaComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('formulario') formulario:MotivosDePausaFormComponent;
  @ViewChild('tabla') tabla:MotivosDePausaTablaComponent;
  @ViewChild('reportes') reportes:MotivosDePausaReporteComponent;
  @ViewChild('graficos') graficos:MotivosDePausaGraficosComponent;

  mostrarForm:boolean = true;
  mostrarTabla:boolean = true;
  mostrarReporte:boolean = false;
  mostrarGrafico:boolean = false;

  gifCarga = false;

  constructor() {
  }

  ngAfterViewInit(){
    this.subscription.add(
      this.tabla.getDate.subscribe(data => {
        this.tabla.fechaMin = this.formulario.fechaDesde;
        this.tabla.fechaMax = this.formulario.fechaHasta;
      })
    );
    this.subscription.add(
      this.tabla.informacionOficina.subscribe(async data => {
        //this.gifCarga =  true;
        //setTimeout(()=>{
          this.mostrarForm = false;
          this.mostrarTabla = false;
          this.mostrarGrafico = false;
          this.mostrarReporte = true;
          this.reportes.datosReporte = data;
          this.reportes.gifCarga = true;
          await this.reportes.mostrarDatos();
          //this.gifCarga =  false;
        //}, 3000);
      })
    );
    this.subscription.add(
      this.tabla.informacionOficinaGrafico.subscribe(async data => {
        this.mostrarForm = false;
        this.mostrarTabla = false;
        this.mostrarReporte = false;
        this.mostrarGrafico = true;
        this.graficos.datosReporte = data;
        this.graficos.gifCarga = true;
        await this.graficos.mostrarDatos();
      })
    );
    this.subscription.add(
      this.reportes.btnVolver.subscribe(data => {
        this.mostrarForm = true;
        this.mostrarTabla = true;
        this.mostrarReporte = false;
        this.mostrarGrafico = false;
      })
    );
    this.subscription.add(
      this.graficos.btnVolver.subscribe(data => {
        this.mostrarForm = true;
        this.mostrarTabla = true;
        this.mostrarReporte = false;
        this.mostrarGrafico = false;
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
