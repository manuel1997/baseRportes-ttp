import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

//Services
import { ValidadorService } from '../../../validador/validador.service';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {

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
      'diaI': new FormControl(this.fechaDesde, Validators.required),
      'diaF': new FormControl(this.fechaHasta, [Validators.required]),
      'horaI': new FormControl('', [Validators.required, Validators.max(23), Validators.min(0), this.validar.valorHora]),
      'horaF': new FormControl('', [Validators.required, Validators.max(23), Validators.min(0), this.validar.valorHora]),
      'intervalo': new FormControl('', [Validators.required]),
      'limite': new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    this.parametros.valueChanges.subscribe(val =>{
      if (this.parametros.valid) {
        this.enviar(val);
      }      
    })
  }

  enviar(valores:any){
    this.consulta.length = 0;
    let fechaI = valores['diaI'].split("-");
    let diaI = [ fechaI[2], fechaI[1], fechaI[0] ].join('/');
    let fechaF = valores['diaF'].split("-");
    let diaF = [ fechaF[2], fechaF[1], fechaF[0] ].join('/');
    this.consulta.push({
      'diaI': diaI,
      'diaF': diaF,
      'horaI': valores['horaI'],
      'horaF': valores['horaF'],
      'intervalo': valores['intervalo'],
      'limite': valores['limite']
    });
    this.Parametros.emit(this.consulta[0]);
  }

}
