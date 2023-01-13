import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';

//Componentes Hijos
import { OficinaStatusTablaComponent } from './reporte-oficina-componentes/oficina-status-tabla/oficina-status-tabla.component';
import { OficinaStatusFormComponent } from './reporte-oficina-componentes/oficina-status-form/oficina-status-form.component';
import { OficinaStatusDetallesComponent } from './reporte-oficina-componentes/oficina-status-detalles/oficina-status-detalles.component';

//Utilidad
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-reporte-oficina-online',
  templateUrl: './reporte-oficina-online.component.html',
  styleUrls: ['./reporte-oficina-online.component.css']
})
export class ReporteOficinaOnlineComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChild('form') form:OficinaStatusFormComponent;
  @ViewChild('tabla') tabla:OficinaStatusTablaComponent;
  @ViewChild('detalles') detalles:OficinaStatusDetallesComponent;

  mostrarTabla:boolean = true;
  mostrarForm:boolean = true;
  mostrarDetalles:boolean = false;

  public intervalcargarDatos: any;

  constructor() {

  }

  async ngOnInit() {
    await this.tabla.cargarDatos();
  }

  ngAfterViewInit(){
    this.subscription.add(
      this.tabla.dataDetalle.subscribe(async res => {
        this.mostrarForm = false;
        this.mostrarTabla = false;
        this.mostrarDetalles = true;
        this.detalles.dataDetalle = res;
        await this.detalles.cargarDatos();
      })
    );
    this.subscription.add(
      this.detalles.btnVolver.subscribe(data => {
        this.mostrarForm = true;
        this.mostrarTabla = true;
        this.mostrarDetalles = false;
      })
    );

    this.intervalcargarDatos = setInterval(() => {
      this.tabla.gifCarga = true;
      this.tabla.cargarDatos();
    }, 180000);

    /*interval(60 * 3000).subscribe(
      ((x) => {
        this.tabla.cargarDatos();
      })
    );*/
  }

  ngOnDestroy() {
    clearInterval(this.intervalcargarDatos);
    this.subscription.unsubscribe();
  }
}
