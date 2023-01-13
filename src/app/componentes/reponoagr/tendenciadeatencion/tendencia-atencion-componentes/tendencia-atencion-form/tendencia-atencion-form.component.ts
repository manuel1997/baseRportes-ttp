import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tendencia-atencion-form',
  templateUrl: './tendencia-atencion-form.component.html',
  styleUrls: ['./tendencia-atencion-form.component.css']
})
export class TendenciaAtencionFormComponent implements OnInit {
  @Output() Parametros : EventEmitter<any> = new EventEmitter();

  parametros: FormGroup;
  consulta:any[] = [];

  fechaHasta:string;
  fechaDesde:string;

  constructor() {
    this.fechaHasta = new Date().toISOString().substring(0, 10);
    let fechaSplit = this.fechaHasta.split("-");
    this.fechaDesde = fechaSplit[0]+"-"+fechaSplit[1]+"-01";
    
    this.parametros = new FormGroup({
      'fechaI': new FormControl(this.fechaDesde, Validators.required),
      'fechaF': new FormControl(this.fechaHasta, [Validators.required]),
      'periodo': new FormControl('', [Validators.required]),
      'g': new FormControl('R', [Validators.required])
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
    let fechaI = this.parametros.value['fechaI'].split("-");
    let diaI = [ fechaI[2], fechaI[1], fechaI[0] ].join('/');
    let fechaF = this.parametros.value['fechaF'].split("-");
    let diaF = [ fechaF[2], fechaF[1], fechaF[0] ].join('/');
    this.consulta.push({
      'fechaI': diaI,
      'fechaF': diaF,
      'periodo': this.parametros.value['periodo'],
      'g': this.parametros.value['g']
    });
    this.Parametros.emit(this.consulta[0]);
  }

}
