import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-motivos-de-atencion-form',
  templateUrl: './motivos-de-atencion-form.component.html',
  styleUrls: ['./motivos-de-atencion-form.component.css']
})
export class MotivosDeAtencionFormComponent implements OnInit {
  fechaHasta:string;
  fechaDesde:string;

  constructor() { }

  ngOnInit() {
    this.fechaHasta = new Date().toISOString().substring(0, 10);
    let fechaSplit = this.fechaHasta.split("-");
    this.fechaDesde = fechaSplit[0]+"-"+fechaSplit[1]+"-01";
  }

}
