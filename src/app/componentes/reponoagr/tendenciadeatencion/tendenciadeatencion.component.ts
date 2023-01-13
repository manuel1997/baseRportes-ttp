import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

//Componentes
import { SeriesComponent } from '../../comun/series/series.component';
import { OficinasComponent } from '../../comun/oficinas/oficinas.component';

//Componentes Hijos
import { TendenciaAtencionFormComponent } from './tendencia-atencion-componentes/tendencia-atencion-form/tendencia-atencion-form.component';
import { TendenciaAtencionPorcentuajeComponent } from './tendencia-atencion-componentes/tendencia-atencion-porcentuaje/tendencia-atencion-porcentuaje.component';
import { TendenciaAtencionReporteComponent } from './tendencia-atencion-componentes/tendencia-atencion-reporte/tendencia-atencion-reporte.component';
import { TendenciaDeAtencionGraficosComponent } from './tendencia-atencion-componentes/tendencia-de-atencion-graficos/tendencia-de-atencion-graficos.component';

//Servicios
import { ApiTtpService } from '../../../servicios/api-ttp.service';
import { ValidadorService } from '../../../validador/validador.service';

//Utilidades
import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tendenciadeatencion',
  templateUrl: './tendenciadeatencion.component.html',
  styleUrls: ['./tendenciadeatencion.component.css']
})
export class TendenciadeatencionComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('resumen')resumen : SeriesComponent;
  @ViewChild('oficinas')oficinas : OficinasComponent;
  @ViewChild('parametros') parametros: TendenciaAtencionFormComponent;

  @ViewChild('reporte') reporte: TendenciaAtencionReporteComponent;
  @ViewChild('graficos') graficos: TendenciaDeAtencionGraficosComponent;
  @ViewChild('porcentuaje') porcentuaje: TendenciaAtencionPorcentuajeComponent;


  superior:any[] = [];
  periodos:any[] = [];
  datos:any[] = [];
  rango:string = "";

  consulta:any[] = [];

  serie:string;
  oficina:string;

  registros:any[] = [];
  valores:string = "";
  valor_serie:string = "";

  year = 2018;
  week = 40;

  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

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
      if(this.validadorService.rangoFechaPermitido(this.parametros['fechaI'], this.parametros['fechaF'])) {
        this._api.datos_noagrTendenciaAtencion(this.parametros, this.serie, this.oficina);
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
      if(this.validadorService.rangoFechaPermitido(this.parametros['fechaI'], this.parametros['fechaF'])) {
        this._api.datos_noagrTendenciaAtencion(this.parametros, this.serie, this.oficina);
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
      if(this.validadorService.rangoFechaPermitido(this.parametros['fechaI'], this.parametros['fechaF'])) {
        this._api.datos_noagrTendenciaAtencion(this.parametros, this.serie, this.oficina);
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
      if(this.validadorService.rangoFechaPermitido(this.parametros['fechaI'], this.parametros['fechaF'])) {
        this._api.datos_noagrTendenciaAtencion(this.parametros, this.serie, this.oficina);
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
