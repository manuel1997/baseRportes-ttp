import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ReportesBatchFormComponent } from '../reportes-batch-form/reportes-batch-form.component';
import { ReportesBatchListoComponent } from '../reportes-batch-listo/reportes-batch-listo.component';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reportes-batch',
  templateUrl: './reportes-batch.component.html',
  styleUrls: ['./reportes-batch.component.css']
})
export class ReportesBatchComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('resultado') resultado: ReportesBatchListoComponent;
  @ViewChild('parametros') parametros: ReportesBatchFormComponent;

  mostrarForm = true;
  mostrarReporte = false;

  constructor() { }

  ngOnInit() {
    this.subscription.add(
      this.parametros.emitParams.subscribe(res => {
        this.resultado.dataShared = res;
        this.resultado.gifCarga = true;
        this.resultado.generarReporte();
        this.mostrarForm = false;
        this.mostrarReporte = true;
      })
    );
    this.subscription.add(
      this.resultado.btnVolver.subscribe(() => {
        this.mostrarForm = true;
        this.mostrarReporte = false;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
