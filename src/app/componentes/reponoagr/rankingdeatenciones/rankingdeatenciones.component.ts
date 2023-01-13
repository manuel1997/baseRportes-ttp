import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

//Componentes
import { SeriesComponent } from '../../comun/series/series.component';
import { OficinasComponent } from '../../comun/oficinas/oficinas.component';

//Componentes Hijos
import { RankingdeatencionesFormComponent } from './rankingdeatenciones-componentes/rankingdeatenciones-form/rankingdeatenciones-form.component';
import { RankingdeatencionesReporteComponent } from './rankingdeatenciones-componentes/rankingdeatenciones-reporte/rankingdeatenciones-reporte.component';
import { RankingdeatencionesGraficosComponent } from './rankingdeatenciones-componentes/rankingdeatenciones-graficos/rankingdeatenciones-graficos.component';
import { RankingdeatencionesPorcentuajeComponent } from './rankingdeatenciones-componentes/rankingdeatenciones-porcentuaje/rankingdeatenciones-porcentuaje.component';

//Servicios
import { ApiTtpService } from '../../../servicios/api-ttp.service';

//Utilidades
import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rankingdeatenciones',
  templateUrl: './rankingdeatenciones.component.html',
  styleUrls: ['./rankingdeatenciones.component.css']
})

export class RankingdeatencionesComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('resumen')resumen : SeriesComponent;
  @ViewChild('oficinas')oficinas : OficinasComponent;
  @ViewChild('parametros') parametros: RankingdeatencionesFormComponent;

  @ViewChild('reporte') reporte: RankingdeatencionesReporteComponent;
  @ViewChild('graficos') graficos: RankingdeatencionesGraficosComponent;
  @ViewChild('porcentuaje') porcentuaje: RankingdeatencionesPorcentuajeComponent;

  superior:any[] = [];
  datos:any[] = [];

  serie:string;
  oficina:string;

  mostrarForm:boolean = true;
  mostrarReporte:boolean = false;
  mostrarGrafica:boolean = false;
  mostrarPorcentuaje:boolean = false;

  constructor(private _api: ApiTtpService) {
  }

  ngOnInit() {
    this.parametros.Parametros.subscribe(res=>{
      this.parametros = res; console.log(res);
    });
  }

  ngAfterViewInit(){
    this.subscription.add(
      this.resumen.SerieEvent.subscribe(res=>{
        this.serie = res;
      })
    );
    this.subscription.add(
      this.oficinas.OficinaEvent.subscribe(res=>{
        this.oficina = res;
      })
    );
    this.subscription.add(
      this.reporte.btnVolver.subscribe(() => {
        this.mostrarForm = true;
        this.mostrarReporte = false;
        this.mostrarGrafica = false;
        this.mostrarPorcentuaje = false;
      })
    );
    this.subscription.add(
      this.graficos.btnVolver.subscribe(() => {
        this.mostrarForm = true;
        this.mostrarReporte = false;
        this.mostrarGrafica = false;
        this.mostrarPorcentuaje = false;
      })
    );
    this.subscription.add(
      this.porcentuaje.btnVolver.subscribe(() => {
        this.mostrarForm = true;
        this.mostrarReporte = false;
        this.mostrarGrafica = false;
        this.mostrarPorcentuaje = false;
      })
    );
  }

  async enviar(){
    if (this.serie && this.oficina) {
      this._api.datos_noagrRankingAtencion(this.parametros, this.serie, this.oficina);
      this.mostrarForm = false;
      this.mostrarReporte = true;
      this.mostrarGrafica = false;
      this.mostrarPorcentuaje = false;
      this.reporte.gifCarga = true;
      await this.reporte.mostrarReporte();
    } else{
      Swal('Alerta', 'Favor Seleccione Series y/o Oficinas', 'error');
    }
  }

  async excel(){
    if (this.serie && this.oficina) {
      this._api.datos_noagrRankingAtencion(this.parametros, this.serie, this.oficina);
      await this.reporte.generarExcel();
    } else{
      Swal('Alerta', 'Favor Seleccione Series y/o Oficinas', 'error');
    }
  }

  async grafica() {
    if (this.serie && this.oficina) {
      this._api.datos_noagrRankingAtencion(this.parametros, this.serie, this.oficina);
      this.mostrarForm = false;
      this.mostrarReporte = false;
      this.mostrarGrafica = true;
      this.mostrarPorcentuaje = false;
      this.graficos.gifCarga = true;
      await this.graficos.generarGrafico();
    } else{
      Swal('Alerta', 'Favor Seleccione Series y/o Oficinas', 'error');
    }
  }

  async porcentaje() {
    if (this.serie && this.oficina) {
      this._api.datos_noagrRankingAtencion(this.parametros, this.serie, this.oficina);
      this.mostrarForm = false;
      this.mostrarReporte = false;
      this.mostrarGrafica = false;
      this.mostrarPorcentuaje = true;
      this.porcentuaje.gifCarga = true;
      await this.porcentuaje.generarPorcentuaje();
    } else{
      Swal('Alerta', 'Favor Seleccione Series y/o Oficinas', 'error');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
