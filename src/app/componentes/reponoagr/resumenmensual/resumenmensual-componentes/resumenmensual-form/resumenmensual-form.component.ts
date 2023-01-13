import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//Services
import { ValidadorService } from '../../../../../validador/validador.service';

@Component({
  selector: 'app-resumenmensual-form',
  templateUrl: './resumenmensual-form.component.html',
  styleUrls: ['./resumenmensual-form.component.css']
})
export class ResumenmensualFormComponent implements OnInit {
  @Output() Parametros : EventEmitter<any> = new EventEmitter();

  parametros: FormGroup;
  consulta:any[] = [];
  fechaDesde:string;

  constructor(public validar: ValidadorService) {
    let fechaSplit = new Date().toISOString().substring(0, 10).split("-");
    this.fechaDesde = fechaSplit[0]+"-"+fechaSplit[1]+"-01";

    this.parametros = new FormGroup({
      'mes': new FormControl(this.fechaDesde, Validators.required),
      'horaI': new FormControl('', [Validators.required, this.validar.valorHora]),
      'horaF': new FormControl('', [Validators.required, this.validar.valorHora])
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
    let diaI = this.parametros.value['mes'].split("-");
    let fechaI = [ diaI[2], diaI[1], diaI[0] ].join('/');
    this.consulta.push({
      'mes': fechaI,
      'horaI': this.parametros.value['horaI'],
      'horaF': this.parametros.value['horaF']
    });
    this.Parametros.emit(this.consulta[0]);
  }

}
