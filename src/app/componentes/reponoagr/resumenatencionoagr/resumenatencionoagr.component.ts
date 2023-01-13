import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

//Componentes
import { SeriesComponent } from '../../comun/series/series.component';
import { OficinasComponent } from '../../comun/oficinas/oficinas.component';

//Componentes Hijos
import { ResumenatencionoagrFormComponent } from './resumenatencionoagr-componentes/resumenatencionoagr-form/resumenatencionoagr-form.component';
import { ResumenatencionoagrGraficosComponent } from './resumenatencionoagr-componentes/resumenatencionoagr-graficos/resumenatencionoagr-graficos.component';
import { ResumenatencionoagrPorcentuajeComponent } from './resumenatencionoagr-componentes/resumenatencionoagr-porcentuaje/resumenatencionoagr-porcentuaje.component';
import { ResumenatencionoagrReporteComponent } from './resumenatencionoagr-componentes/resumenatencionoagr-reporte/resumenatencionoagr-reporte.component';

//Servicios
import { ApiTtpService } from '../../../servicios/api-ttp.service';
import { ValidadorService } from '../../../validador/validador.service';

//Utilidades
import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resumenatencionoagr',
  templateUrl: './resumenatencionoagr.component.html',
  styleUrls: ['./resumenatencionoagr.component.css']
})
export class ResumenatencionoagrComponent implements OnInit, AfterViewInit {
  private subscription: Subscription = new Subscription();
  @ViewChild('resumen')resumen : SeriesComponent;
  @ViewChild('oficinas')oficinas : OficinasComponent;
  @ViewChild('form') parametros: ResumenatencionoagrFormComponent;

  @ViewChild('reporte') reporte: ResumenatencionoagrReporteComponent;
  @ViewChild('graficos') graficos: ResumenatencionoagrGraficosComponent;
  @ViewChild('porcentuaje') porcentuaje: ResumenatencionoagrPorcentuajeComponent;

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

  enviar(){
    if (this.serie && this.oficina) {
      if(this.validadorService.rangoFechaPermitido(this.parametros['diaI'], this.parametros['diaF']) &&this.validadorService.rangoFechaPermitido(this.parametros['horaI'], this.parametros['horaF'])) {
        this._api.datos_noagrResumenEA(this.parametros, this.serie, this.oficina);
        this.mostrarForm = false;
        this.mostrarReporte = true;
        this.mostrarGrafica = false;
        this.mostrarPorcentuaje = false;
        this.reporte.gifCarga = true;
        this.reporte.mostrarReporte();
      } else{
        Swal('Alerta', 'Rango de fecha no validos', 'error');
      }
    } else{
      Swal('Alerta', 'Favor Seleccione Series y/o Oficinas', 'error');
    }
  }

  excel(){
    if (this.serie && this.oficina) {
      if(this.validadorService.rangoFechaPermitido(this.parametros['diaI'], this.parametros['diaF']) &&this.validadorService.rangoFechaPermitido(this.parametros['horaI'], this.parametros['horaF'])) {
        this._api.datos_noagrResumenEA(this.parametros, this.serie, this.oficina);
        this.reporte.generarExcel();
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
