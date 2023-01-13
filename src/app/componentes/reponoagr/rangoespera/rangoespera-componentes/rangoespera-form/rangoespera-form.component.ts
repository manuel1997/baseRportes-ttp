import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

//Services
import { ValidadorService } from '../../../../../validador/validador.service';

@Component({
  selector: 'app-rangoespera-form',
  templateUrl: './rangoespera-form.component.html',
  styleUrls: ['./rangoespera-form.component.css']
})
export class RangoesperaFormComponent implements OnInit {
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
      'Mes': new FormControl(this.fechaDesde, Validators.required),
      'horaI1': new FormControl('', [Validators.required, this.validar.valorHora]),
      'horaF1': new FormControl('', [Validators.required, this.validar.valorHora]),
      'horaI2': new FormControl('', [Validators.required, this.validar.valorHora]),
      'horaF2': new FormControl('', [Validators.required, this.validar.valorHora]),
      'rango': new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    this.parametros.valueChanges.subscribe(() =>{
      if (this.parametros.valid) {
        this.enviar();
      }      
    })
  }

  enviar(){
    this.consulta.length = 0;
    let fechaI = this.parametros.value['Mes'].split("-");
    let diaI = [ fechaI[2], fechaI[1], fechaI[0] ].join('/');
    this.consulta.push({
      'Mes': diaI,
      'horaI1': this.parametros.value['horaI1'],
      'horaF1': this.parametros.value['horaF1'],
      'horaI2': this.parametros.value['horaI2'],
      'horaF2': this.parametros.value['horaF2'],
      'rango': this.parametros.value['rango']
    });
    this.Parametros.emit(this.consulta[0]);
  }

}
