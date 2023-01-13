import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estado-de-ejecutivos-form',
  templateUrl: './estado-de-ejecutivos-form.component.html',
  styleUrls: ['./estado-de-ejecutivos-form.component.css']
})
export class EstadoDeEjecutivosFormComponent implements OnInit {
  dia:string;
  intervalo:number = 30;
  horaInicial:number;
  horaFinal:number;

  constructor() { }

  ngOnInit() {
    this.dia = new Date().toISOString().substring(0, 10);
  }
}
