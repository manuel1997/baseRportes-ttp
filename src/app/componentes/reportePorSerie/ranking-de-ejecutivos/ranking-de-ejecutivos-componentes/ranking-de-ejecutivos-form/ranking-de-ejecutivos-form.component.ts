import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ranking-de-ejecutivos-form',
  templateUrl: './ranking-de-ejecutivos-form.component.html',
  styleUrls: ['./ranking-de-ejecutivos-form.component.css']
})
export class RankingDeEjecutivosFormComponent implements OnInit {
  @Output() formulario : EventEmitter<any> = new EventEmitter();

  parametros: FormGroup;
  consulta:any[] = [];
  fechaHasta:string;
  fechaDesde:string;

  constructor() {
    this.fechaHasta = new Date().toISOString().substring(0, 10);
    let fechaSplit = this.fechaHasta.split("-");
    this.fechaDesde = fechaSplit[0]+"-"+fechaSplit[1]+"-01";
    this.parametros = new FormGroup({
      'diaI': new FormControl(this.fechaDesde, Validators.required),
      'diaF': new FormControl(this.fechaHasta, Validators.required)
    })
  }

  ngOnInit() {
    this.parametros.valueChanges.subscribe(() =>{
      if (this.parametros.valid) {
        this.enviar();
      }      
    });
  }

  ngAfterViewInit() {
    if (this.parametros.valid) {
      this.enviar();
    }
  }

  enviar(){
    this.consulta.length = 0;
    let diaI = this.parametros.value['diaI'].split("-");
    let fechaI = [ diaI[2], diaI[1], diaI[0] ].join('/');
    let diaF = this.parametros.value['diaF'].split("-");
    let fechaF = [ diaF[2], diaF[1], diaF[0] ].join('/');
    this.consulta.push({
      'diaI': fechaI,
      'diaF': fechaF
    });
    this.formulario.emit(this.consulta[0]);
  }

}
