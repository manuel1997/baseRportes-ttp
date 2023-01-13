import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

//Componentes
import { SeriesComponent } from '../../comun/series/series.component';
import { OficinasComponent } from '../../comun/oficinas/oficinas.component';

//Componentes Hijos
import { ResumenesperanoagrFormComponent } from './resumenesperanoagr-componentes/resumenesperanoagr-form/resumenesperanoagr-form.component';
import { ResumenesperanoagrGraficosComponent } from './resumenesperanoagr-componentes/resumenesperanoagr-graficos/resumenesperanoagr-graficos.component';
import { ResumenesperanoagrPorcentuajeComponent } from './resumenesperanoagr-componentes/resumenesperanoagr-porcentuaje/resumenesperanoagr-porcentuaje.component';
import { ResumenesperanoagrReporteComponent } from './resumenesperanoagr-componentes/resumenesperanoagr-reporte/resumenesperanoagr-reporte.component';

//Servicios
import { ApiTtpService } from '../../../servicios/api-ttp.service';
import { ValidadorService } from '../../../validador/validador.service';

//Utilidades
import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resumenesperanoagr',
  templateUrl: './resumenesperanoagr.component.html',
  styleUrls: ['./resumenesperanoagr.component.css']
})
export class ResumenesperanoagrComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('resumen')resumen : SeriesComponent;
  @ViewChild('oficinas')oficinas : OficinasComponent;
  @ViewChild('parametros') parametros: ResumenesperanoagrFormComponent;

  @ViewChild('reporte') reporte: ResumenesperanoagrReporteComponent;
  @ViewChild('graficos') graficos: ResumenesperanoagrGraficosComponent;
  @ViewChild('porcentuaje') porcentuaje: ResumenesperanoagrPorcentuajeComponent;

  serie:string;
  oficina:string;

  mostrarForm:boolean = true;
  mostrarReporte:boolean = false;
  mostrarGrafica:boolean = false;
  mostrarPorcentuaje:boolean = false;

  constructor(private _api: ApiTtpService,
              private validadorService:ValidadorService) {
  }

  ngOnInit() {
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
      this.parametros.Parametros.subscribe(res=>{
        this.parametros = res;
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
      if(this.validadorService.rangoFechaPermitido(this.parametros['diaI'], this.parametros['diaF']) &&this.validadorService.rangoFechaPermitido(this.parametros['horaI'], this.parametros['horaF'])) {
        this._api.datos_noagrResumenEA(this.parametros, this.serie, this.oficina);
        this.mostrarForm = false;
        this.mostrarReporte = true;
        this.mostrarGrafica = false;
        this.mostrarPorcentuaje = false;
        this.reporte.gifCarga = true;
        await this.reporte.mostrarReporte();
      } else{
        Swal('Alerta', 'Rango de fecha no validos', 'error');
      }
    } else{
      Swal('Alerta', 'Favor Seleccione Series y/o Oficinas', 'error');
    }
  }

  async excel(){
    if (this.serie && this.oficina) {
      if(this.validadorService.rangoFechaPermitido(this.parametros['diaI'], this.parametros['diaF']) &&this.validadorService.rangoFechaPermitido(this.parametros['horaI'], this.parametros['horaF'])) {
        this._api.datos_noagrResumenEA(this.parametros, this.serie, this.oficina);
        await this.reporte.generarExcel();
      } else{
        Swal('Alerta', 'Rango de fecha no validos', 'error');
      }
    } else{
      Swal('Alerta', 'Favor Seleccione Series y/o Oficinas', 'error');
    }
  }

  async grafica() {
    if (this.serie && this.oficina) {
      if(this.validadorService.rangoFechaPermitido(this.parametros['diaI'], this.parametros['diaF']) &&this.validadorService.rangoFechaPermitido(this.parametros['horaI'], this.parametros['horaF'])) {
        this._api.datos_noagrResumenEA(this.parametros, this.serie, this.oficina);
        this.mostrarForm = false;
        this.mostrarReporte = false;
        this.mostrarGrafica = true;
        this.mostrarPorcentuaje = false;
        this.graficos.gifCarga = true;
        await this.graficos.generarGrafico();
      } else{
        Swal('Alerta', 'Rango de fecha no validos', 'error');
      }
    } else{
      Swal('Alerta', 'Favor Seleccione Series y/o Oficinas', 'error');
    }
  }

  async porcentaje() {
    if (this.serie && this.oficina) {
      if(this.validadorService.rangoFechaPermitido(this.parametros['diaI'], this.parametros['diaF']) &&this.validadorService.rangoFechaPermitido(this.parametros['horaI'], this.parametros['horaF'])) {
        this._api.datos_noagrResumenEA(this.parametros, this.serie, this.oficina);
        this.mostrarForm = false;
        this.mostrarReporte = false;
        this.mostrarGrafica = false;
        this.mostrarPorcentuaje = true;
        this.porcentuaje.gifCarga = true;
        await this.porcentuaje.generarPorcentuaje();
      } else{
        Swal('Alerta', 'Rango de fecha no validos', 'error');
      }
    } else{
      Swal('Alerta', 'Favor Seleccione Series y/o Oficinas', 'error');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
