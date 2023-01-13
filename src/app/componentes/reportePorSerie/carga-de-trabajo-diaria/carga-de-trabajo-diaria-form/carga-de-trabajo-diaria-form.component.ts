import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carga-de-trabajo-diaria-form',
  templateUrl: './carga-de-trabajo-diaria-form.component.html',
  styleUrls: ['./carga-de-trabajo-diaria-form.component.css']
})
export class CargaDeTrabajoDiariaFormComponent implements OnInit {
  fecha:string;
  horaInicial:string;
  horaFinal:string;
  intervalo:string;
  serie:string;

  constructor() { }

  ngOnInit() {
    this.fecha = new Date().toISOString().substring(0, 10);
  }

}
