import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { ApiTtpService } from '../../../servicios/api-ttp.service';
import { ValidarTransaccionService } from '../../../servicios/validar-transaccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-serie-radio',
  templateUrl: './serie-radio.component.html',
  styleUrls: ['./serie-radio.component.css']
})
export class SerieRadioComponent implements OnInit {

  @Output() SerieEvent : EventEmitter<any> = new EventEmitter();
  series:any[] = [];
  series_selec:any[] = [];

  constructor(private ttp: ApiTtpService, private validarService: ValidarTransaccionService) {
    this.obtener_series();
  }

  ngOnInit() {
  }

  async obtener_series() {
    /* this.ttp.obtener_series().subscribe( data=>{
      let registros = data["data"].substring(14, data["data"].length - 5).split("|");
      for (let index = 0; index < registros.length; index++) {
        let campos = registros[index].split("~");
        this.series.push({"id":campos[0], "serie": campos[1]});
      }
    }) */

    let data = await this.ttp.obtener_series();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      if (this.validarService.validarError(data) == 'ok') {
        let registros = data['data'].substring(14, data['data'].length - 5).split('|');
        for (let index = 0; index < registros.length; index++) {
          let campos = registros[index].split('~');
          this.series.push({'id': campos[0], 'serie': campos[1]});
        }
      } else {
        Swal('Error', this.validarService.validarError(data), 'error');
      }
    }
  }

  marcar(e, registro){
    if (e.target.checked) {
      this.series_selec = registro.id;
    } else {
      let a = this.series_selec.indexOf(registro.id);
      this.series_selec.splice(a, 1);
    }
    this.SerieEvent.emit(this.series_selec);
  }

}
