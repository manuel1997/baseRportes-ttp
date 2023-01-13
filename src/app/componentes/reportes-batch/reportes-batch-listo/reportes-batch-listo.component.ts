import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Interfaces
import { IReportesBatch } from '../../../interfaces/reportes-batch';

// Servicios
import { ReportesBatchService } from '../../../servicios/reportes-batch.service';

import Swal from 'sweetalert2';
import { ValidarTransaccionService } from '../../../servicios/validar-transaccion.service';

@Component({
  selector: 'app-reportes-batch-listo',
  templateUrl: './reportes-batch-listo.component.html',
  styleUrls: ['./reportes-batch-listo.component.css']
})
export class ReportesBatchListoComponent implements OnInit {
  @Input() dataShared: string;
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();

  iReportesBatch: IReportesBatch = {
    usuario: localStorage.getItem('repousuario'),
    password: localStorage.getItem('repopassword'),
    desde: '',
    hasta: '',
    id_usuario: localStorage.getItem('repoid_usuario')
  };

  flag = true;
  gifCarga = true;
  archivo = '';

  constructor(private reportesBatchService: ReportesBatchService, private validarService: ValidarTransaccionService) { }

  ngOnInit() {
  }

  async generarReporte() {
    this.iReportesBatch = {
      usuario: localStorage.getItem('repousuario'),
      password: localStorage.getItem('repopassword'),
      desde: '',
      hasta:  '',
      id_usuario: Number(localStorage.getItem('repoid_usuario'))
    };

    const registros = this.dataShared.split('~');

    this.iReportesBatch = {
      usuario: localStorage.getItem('repousuario'),
      password: localStorage.getItem('repopassword'),
      desde: registros[0],
      hasta: registros[1],
      id_usuario: Number(localStorage.getItem('repoid_usuario'))
    };

    let data = await this.reportesBatchService.solicitarBatch(this.iReportesBatch);
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      if (this.validarService.validarError(data) == 'ok') {
        this.archivo = data['data'].substring(14, data['data'].length - 5);
        if (this.archivo.length < 0) {
          this.flag = false;
        }
      } else {
        Swal('Error', this.validarService.validarError(data), 'error');
      }
    }
    this.gifCarga = false;
  }

  atras() {
    this.btnVolver.emit();
  }
}
