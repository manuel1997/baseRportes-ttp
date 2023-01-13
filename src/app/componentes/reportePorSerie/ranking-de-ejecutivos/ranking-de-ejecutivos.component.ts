import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

//Componentes
import { SerieRadioComponent } from '../../comun/serie-radio/serie-radio.component';

//Componentes Hijos
import { RankingDeEjecutivosFormComponent } from './ranking-de-ejecutivos-componentes/ranking-de-ejecutivos-form/ranking-de-ejecutivos-form.component';
import { RankingDeEjecutivosReporteComponent } from './ranking-de-ejecutivos-componentes/ranking-de-ejecutivos-reporte/ranking-de-ejecutivos-reporte.component';
import { RankingDeEjecutivosTablaComponent } from './ranking-de-ejecutivos-componentes/ranking-de-ejecutivos-tabla/ranking-de-ejecutivos-tabla.component';

import { Subscription } from 'rxjs';



@Component({
  selector: 'app-ranking-de-ejecutivos',
  templateUrl: './ranking-de-ejecutivos.component.html',
  styleUrls: ['./ranking-de-ejecutivos.component.css']
})
export class RankingDeEjecutivosComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('series')series : SerieRadioComponent;
  @ViewChild('formulario') formulario: RankingDeEjecutivosFormComponent;
  @ViewChild('tabla') tabla: RankingDeEjecutivosTablaComponent;

  @ViewChild('reporte') reporte: RankingDeEjecutivosReporteComponent;

  mostrarForm:boolean = true;
  mostrarSeries:boolean = true;
  mostrarTabla:boolean = true;
  mostrarReporte:boolean = false;


  serie:string;
  oficina:string;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.subscription.add(
      this.series.SerieEvent.subscribe(res=>{
        this.serie = res;
      })
    );
    this.subscription.add(
      this.formulario.formulario.subscribe(data=>{
        this.tabla.consulta = data;
      })
    );

    this.subscription.add(
      this.series.SerieEvent.subscribe(data => {
        this.tabla.serie = data;
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
