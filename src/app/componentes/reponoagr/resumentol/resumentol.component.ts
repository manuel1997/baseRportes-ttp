import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

//Componentes
import { SeriesComponent } from '../../comun/series/series.component';
import { OficinasComponent } from '../../comun/oficinas/oficinas.component';

//Componentes Hijos
import { ResumentolFormComponent } from './resumentol-componentes/resumentol-form/resumentol-form.component';
import { ResumentolReporteComponent } from './resumentol-componentes/resumentol-reporte/resumentol-reporte.component';

//Servicios
import { ApiTtpService } from '../../../servicios/api-ttp.service';

//Utilidades
import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resumentol',
  templateUrl: './resumentol.component.html',
  styleUrls: ['./resumentol.component.css']
})
export class ResumentolComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('resumen')resumen : SeriesComponent;
  @ViewChild('oficinas')oficinas : OficinasComponent;
  @ViewChild('parametros') parametros: ResumentolFormComponent;

  @ViewChild('reporte') reporte: ResumentolReporteComponent;

  serie:string;
  oficina:string;

  mostrarForm:boolean = true;
  mostrarReporte:boolean = false;

  superior:any[] = [];
  datos:any[] = [];

  registros:any[] = [];
  valores:string = "";
  valor_serie:string = "";

  fechaDesde:string;

  constructor(private _api: ApiTtpService) {

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
        this.parametros = res; console.log(res);
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
      this._api.datos_noagrResumentol(this.parametros, this.serie, this.oficina);
      this.mostrarForm = false;
      this.mostrarReporte = true;
      this.reporte.gifCarga = true;
      await this.reporte.mostrarReporte();
    } else{
      Swal('Alerta', 'Favor Seleccione Series y/o Oficinas', 'error');
    }
  }

  async excel(){
    if (this.serie && this.oficina) {
      this._api.datos_noagrResumentol(this.parametros, this.serie, this.oficina);
      await this.reporte.generarExcel();
    } else{
      Swal('Alerta', 'Favor Seleccione Series y/o Oficinas', 'error');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
