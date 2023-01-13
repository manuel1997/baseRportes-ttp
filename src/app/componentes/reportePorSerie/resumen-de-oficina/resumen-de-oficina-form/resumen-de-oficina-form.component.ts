import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-resumen-de-oficina-form',
  templateUrl: './resumen-de-oficina-form.component.html',
  styleUrls: ['./resumen-de-oficina-form.component.css']
})
export class ResumenDeOficinaFormComponent implements OnInit {
  todosCheck:boolean = false;
  checkDias:boolean[] = [false,false,false,false,false,false,false];
  
  fechaInicial:string = "";
  fechaFinal:string = "";
  horaInicial:string = "";
  horaFinal:string = "";
  horaInicial2:string = "";
  horaFinal2:string = "";
  intervalo:string = "";
  dias:string = "";

  constructor() { }

  ngOnInit() {
    this.fechaFinal = new Date().toISOString().substring(0, 10);
    let fechaSplit = this.fechaFinal.split("-");
    this.fechaInicial = fechaSplit[0]+"-"+fechaSplit[1]+"-01";
  }

  seleccionarTodos(){
    for(let i in this.checkDias){
      this.checkDias[i] = this.todosCheck;
    }
  }
  obtenerDias(){
    let dias = "";
    for(let i in this.checkDias){
      if(this.checkDias[i]){
        dias += String(Number(i)+1);
      }
    }
    this.dias = dias;
  }

}
