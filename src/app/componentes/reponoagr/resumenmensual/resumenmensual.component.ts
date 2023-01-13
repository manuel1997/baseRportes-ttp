import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

//Componentes
import { SeriesComponent } from '../../comun/series/series.component';
import { OficinasComponent } from '../../comun/oficinas/oficinas.component';

//Componentes Hijos
import { ResumenmensualFormComponent } from './resumenmensual-componentes/resumenmensual-form/resumenmensual-form.component';
import { ResumenmensualReporteComponent } from './resumenmensual-componentes/resumenmensual-reporte/resumenmensual-reporte.component';

//Servicios
import { ApiTtpService } from '../../../servicios/api-ttp.service';
import { ValidadorService } from '../../../validador/validador.service';

//Utilidades
import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resumenmensual',
  templateUrl: './resumenmensual.component.html',
  styleUrls: ['./resumenmensual.component.css']
})
export class ResumenmensualComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('resumen')resumen : SeriesComponent;
  @ViewChild('oficinas')oficinas : OficinasComponent;
  @ViewChild('parametros') parametros: ResumenmensualFormComponent;

  @ViewChild('reporte') reporte: ResumenmensualReporteComponent;

  superior:any[] = [];
  datos:any[] = [];

  serie:string;
  oficina:string;

  mostrarForm:boolean = true;
  mostrarReporte:boolean = false;

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
      this.reporte.btnVolver.subscribe(data => {
        this.mostrarForm = true;
        this.mostrarReporte = false;
      })
    );
  }

  async enviar(){
    if (this.serie && this.oficina) {
      if(this.validadorService.rangoHoraPermitido(this.parametros['horaI'], this.parametros['horaF'])){
        this._api.datos_noagrResumenMensual(this.parametros, this.serie, this.oficina);
        this.mostrarForm = false;
        this.mostrarReporte = true;
        this.reporte.gifCarga = true;
        await this.reporte.mostrarReporte();
      } else{
        Swal('Alerta', 'Rango de fecha y/o hora no validos', 'error');
      }
    } else{
      Swal('Alerta', 'Favor Seleccione Series y/o Oficinas', 'error');
    }
  }

  async excel(){
    if (this.serie && this.oficina) {
      if(this.validadorService.rangoHoraPermitido(this.parametros['horaI'], this.parametros['horaF'])){
        this._api.datos_noagrResumenMensual(this.parametros, this.serie, this.oficina);
        await this.reporte.generarExcel();
      } else{
        Swal('Alerta', 'Rango de fecha y/o hora no validos', 'error');
      }
    } else{
      Swal('Alerta', 'Favor Seleccione Series y/o Oficinas', 'error');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
