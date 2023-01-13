import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

//Utilidades
import Swal from 'sweetalert2';

//Componentes
import { SeriesComponent } from '../../comun/series/series.component';
import { OficinasComponent } from '../../comun/oficinas/oficinas.component';
import { ParametrosComponent } from '../../repoagr/parametros/parametros.component';

//Componentes Hijos
import { ResumenatencionReporteComponent } from './resumenatencion-componentes/resumenatencion-reporte/resumenatencion-reporte.component';

//Servicios
import { ApiTtpService } from '../../../servicios/api-ttp.service';
import { ValidadorService } from '../../../validador/validador.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resumenatencion',
  templateUrl: './resumenatencion.component.html',
  styleUrls: ['./resumenatencion.component.css']
})
export class ResumenatencionComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('series')series : SeriesComponent;
  @ViewChild('oficinas')oficinas : OficinasComponent;
  @ViewChild('Parametros')Parametros : ParametrosComponent;

  @ViewChild('reporte') reporte: ResumenatencionReporteComponent;

  mostrarForm:boolean = true;
  mostrarReporte:boolean = false;

  serie:string;
  oficina:string;
  parametros:any[] = [];
  consulta:any[] = [];

  registros:any[] = [];
  valores:string = "";
  valor_serie:string = "";

  constructor(private _api: ApiTtpService,
              private validadorService:ValidadorService) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subscription.add(
      this.series.SerieEvent.subscribe(res => {
        this.serie = res;
      })
    );

    this.subscription.add(
      this.oficinas.OficinaEvent.subscribe(res=>{
        this.oficina = res;
      })
    );

    this.subscription.add(
      this.Parametros.Parametros.subscribe(res=>{
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
      if(this.validadorService.rangoFechaPermitido(this.parametros['diaI'], this.parametros['diaF']) && this.validadorService.rangoHoraPermitido(this.parametros['horaI'], this.parametros['horaF'])){
        this._api.datos_consulta_agrupada(this.parametros, this.serie, this.oficina);
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
      if(this.validadorService.rangoFechaPermitido(this.parametros['diaI'], this.parametros['diaF']) && this.validadorService.rangoHoraPermitido(this.parametros['horaI'], this.parametros['horaF'])){
        this._api.datos_consulta_agrupada(this.parametros, this.serie, this.oficina);
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
