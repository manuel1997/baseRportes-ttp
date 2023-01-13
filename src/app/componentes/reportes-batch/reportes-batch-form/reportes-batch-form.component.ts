import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Interfaces
import { IReportesBatch } from '../../../interfaces/reportes-batch';

// Servicios
import { ReportesBatchService } from '../../../servicios/reportes-batch.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportes-batch-form',
  templateUrl: './reportes-batch-form.component.html',
  styleUrls: ['./reportes-batch-form.component.css']
})
export class ReportesBatchFormComponent implements OnInit {
  @Output() emitParams: EventEmitter<string> = new EventEmitter<string>();

  iReportesBatch: IReportesBatch = {
    usuario: localStorage.getItem('repousuario'),
    password: localStorage.getItem('repopassword'),
    desde: '',
    hasta: '',
    id_usuario: Number(localStorage.getItem('repoid_usuario'))
  };

  parametros: FormGroup;
  reporte: any[] = [];

  constructor(private reportesBatchService: ReportesBatchService) {
    this.parametros = new FormGroup({
      'desde': new FormControl('', [Validators.required]),
      'hasta': new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  buscar() {
    const a = this.parametros.controls.desde.value.split('-').reverse().join('/') + '~' +
    this.parametros.controls.hasta.value.split('-').reverse().join('/');

    this.emitParams.emit(a);
  }
}
