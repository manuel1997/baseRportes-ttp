import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//Services
import { ValidadorService } from '../../../../../validador/validador.service';

@Component({
  selector: 'app-resumenatencionoagr-form',
  templateUrl: './resumenatencionoagr-form.component.html',
  styleUrls: ['./resumenatencionoagr-form.component.css']
})
export class ResumenatencionoagrFormComponent implements OnInit {
  @Output() Parametros : EventEmitter<any> = new EventEmitter();

  parametros: FormGroup;
  consulta:any[] = [];

  fechaHasta:string;
  fechaDesde:string;

  constructor(public validar: ValidadorService) {
    this.fechaHasta = new Date().toISOString().substring(0, 10);
    let fechaSplit = this.fechaHasta.split("-");
    this.fechaDesde = fechaSplit[0]+"-"+fechaSplit[1]+"-01";

    this.parametros = new FormGroup({
      'fechaI': new FormControl(this.fechaDesde, Validators.required),
      'fechaF': new FormControl(this.fechaHasta, [Validators.required]),
      'horaI': new FormControl('', [Validators.required, this.validar.valorHora]),
      'horaF': new FormControl('', [Validators.required, this.validar.valorHora]),
      'intervalo': new FormControl('', [Validators.required]),
      'limite': new FormControl('', [Validators.required]),
      'g' : new FormControl('R', [Validators.required])
    })
  }

  ngOnInit() {
    this.parametros.valueChanges.subscribe(() =>{
      if (this.parametros.valid) {
        this.enviar();
      }      
    });
  }

  enviar(){
    this.consulta.length = 0;
    let diaI = this.parametros.value['fechaI'].split("-");
    let fechaI = [ diaI[2], diaI[1], diaI[0] ].join('/');
    let diaF = this.parametros.value['fechaF'].split("-");
    let fechaF = [ diaF[2], diaF[1], diaF[0] ].join('/');
    this.consulta.push({
      'diaI': fechaI,
      'diaF': fechaF,
      'horaI': this.parametros.value['horaI'],
      'horaF': this.parametros.value['horaF'],
      'intervalo': this.parametros.value['intervalo'],
      'limite': this.parametros.value['limite'],
      'g' : this.parametros.value['g']
    });
    this.Parametros.emit(this.consulta[0]);
  }

}
