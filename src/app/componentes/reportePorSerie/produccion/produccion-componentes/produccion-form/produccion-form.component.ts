import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-produccion-form',
  templateUrl: './produccion-form.component.html',
  styleUrls: ['./produccion-form.component.css']
})
export class ProduccionFormComponent implements OnInit {
  @Output() formulario : EventEmitter<any> = new EventEmitter();

  parametros: FormGroup;
  consulta:any[] = [];
  fechaDesde:string;

  constructor() {
    let fechaSplit = new Date().toISOString().substring(0, 10).split("-");
    this.fechaDesde = fechaSplit[0]+"-"+fechaSplit[1]+"-01";
    this.parametros = new FormGroup({
      'dia': new FormControl(this.fechaDesde, Validators.required),
      'agrupado': new FormControl('', [Validators.required]),
      'periodo': new FormControl('', [Validators.required])
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
    let diaI = this.parametros.value['dia'].split("-");
    let fechaI = [ diaI[2], diaI[1], diaI[0] ].join('/');
    this.consulta.push({
      'dia': fechaI,
      'agrupado': this.parametros.value['agrupado'],
      'periodo': this.parametros.value['periodo']
    });
    this.formulario.emit(this.consulta[0]);
  }

}
