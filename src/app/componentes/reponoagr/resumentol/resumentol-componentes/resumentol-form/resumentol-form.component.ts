import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-resumentol-form',
  templateUrl: './resumentol-form.component.html',
  styleUrls: ['./resumentol-form.component.css']
})
export class ResumentolFormComponent implements OnInit {
  @Output() Parametros : EventEmitter<any> = new EventEmitter();

  parametros: FormGroup;
  consulta:any[] = [];
  fechaDesde:string;

  constructor() {
    let fechaSplit = new Date().toISOString().substring(0, 10).split("-");
    this.fechaDesde = fechaSplit[0]+"-"+fechaSplit[1]+"-01";

    this.parametros = new FormGroup({
      'mes': new FormControl(this.fechaDesde, Validators.required)
    })
  }

  ngOnInit() {
    this.parametros.valueChanges.subscribe(() =>{
      if (this.parametros.valid) {
        this.enviar();
      }      
    })
  }

  ngAfterViewInit() {
    if (this.parametros.valid) {
      this.enviar();
    }
  }

  enviar(){
    this.consulta.length = 0;
    let diaI = this.parametros.value['mes'].split("-");
    let fechaI = [ diaI[2], diaI[1], diaI[0] ].join('/');
    this.consulta.push({
      'mes': fechaI
    });
    this.Parametros.emit(this.consulta[0]);
  }

}
