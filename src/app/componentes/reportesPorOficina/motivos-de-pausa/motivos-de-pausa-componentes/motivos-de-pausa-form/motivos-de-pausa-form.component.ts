import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-motivos-de-pausa-form',
  templateUrl: './motivos-de-pausa-form.component.html',
  styleUrls: ['./motivos-de-pausa-form.component.css']
})
export class MotivosDePausaFormComponent implements OnInit {
  fechaHasta:string;
  fechaDesde:string;
  constructor() { }

  ngOnInit() {
    this.fechaHasta = new Date().toISOString().substring(0, 10);
    let fechaSplit = this.fechaHasta.split("-");
    this.fechaDesde = fechaSplit[0]+"-"+fechaSplit[1]+"-01";
  }

}
