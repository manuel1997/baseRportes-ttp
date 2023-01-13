import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumen-de-ejecutivo-form',
  templateUrl: './resumen-de-ejecutivo-form.component.html',
  styleUrls: ['./resumen-de-ejecutivo-form.component.css']
})
export class ResumenDeEjecutivoFormComponent implements OnInit {
  fechaHasta:string;
  fechaDesde:string;

  constructor() { }

  ngOnInit() {
    this.fechaHasta = new Date().toISOString().substring(0, 10);
    let fechaSplit = this.fechaHasta.split("-");
    this.fechaDesde = fechaSplit[0]+"-"+fechaSplit[1]+"-01";
  }

}
