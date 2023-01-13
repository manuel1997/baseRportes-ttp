import { Component, OnInit, EventEmitter } from '@angular/core';

// Servicios
import { ReportesBatchService } from '../../../servicios/reportes-batch.service';

// URL
import { URL_BASE } from '../../../config/url.servicios';

import Swal from 'sweetalert2';
import { ValidarTransaccionService } from '../../../servicios/validar-transaccion.service';

@Component({
  selector: 'app-reportes-batch-listado',
  templateUrl: './reportes-batch-listado.component.html',
  styleUrls: ['./reportes-batch-listado.component.css']
})
export class ReportesBatchListadoComponent implements OnInit {
  listado: any[] = [];
  // ruta = URL_BASE + '/Reportes';
  ruta = URL_BASE;

  constructor(private reportesBatchService: ReportesBatchService, private validarService: ValidarTransaccionService) { }

  async ngOnInit() {
    await this.obtenerListado();
  }

  async obtenerListado() {
    this.listado.length = 0;
    let nombre = '';
    let link = '';
    let fecha = '';
    let hora = '';

    /* this.reportesBatchService.listarBatch().subscribe(data => {
      const registros = data['data'].substring(0, data['data'].length - 5).split('|');

      for (let i = 0; i < registros.length; i++) {
        if (i !== 0) {
          const datos = registros[i].split('Ç');

          for (let j = 0; j < datos.length; j++) {
            nombre = datos[0];
            link = datos[1];
            fecha = datos[2];
            hora = datos[3];
          }
          this.listado.push({
            'nombre': nombre,
            'link': link,
            'fecha': fecha,
            'hora': hora
          });
        }
      }
    }); */

    let data = await this.reportesBatchService.listarBatch();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      if (this.validarService.validarError(data) == 'ok') {
        const registros = data['data'].substring(0, data['data'].length - 5).split('|');

        for (let i = 0; i < registros.length; i++) {
          if (i !== 0) {
            const datos = registros[i].split('Ç');

            for (let j = 0; j < datos.length; j++) {
              nombre = datos[0];
              link = datos[1];
              fecha = datos[2];
              hora = datos[3];
            }
            this.listado.push({
              'nombre': nombre,
              'link': link,
              'fecha': fecha,
              'hora': hora
            });
          }
        }
      } else {
        Swal('Error', this.validarService.validarError(data), 'error');
      }
    }
  }
}
