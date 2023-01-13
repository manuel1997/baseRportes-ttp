import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { ApiTtpService } from '../../../servicios/api-ttp.service';
import Swal from 'sweetalert2';
import { ValidarTransaccionService } from '../../../servicios/validar-transaccion.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  @Output() SerieEvent : EventEmitter<any> = new EventEmitter();

  series:any[] = [];
  series_selec:Array<string> = [];

  seriesTodasSeleccionadas:Boolean = false;

  arrayAgrupados: Array<any> = [];
  stringAgrupados:string = '';

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
        this.series.push({"id": campos[0], "serie": campos[1],"check": false});
      }
    }); */
    let data = await this.ttp.obtener_series();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      if (this.validarService.validarError(data) == 'ok') {
        let registros = data['data'].substring(14, data['data'].length - 5).split('|');
        for (let index = 0; index < registros.length; index++) {
          let campos = registros[index].split('~');
          this.series.push({'id': campos[0], 'serie': campos[1], 'check': false});
        }
      } else {
        Swal('Error', this.validarService.validarError(data), 'error');
      }
    }
  }

  marcar(e) {
    this.enviar();
  }

  seleccionarTodasLasSeries() {
    for(let index in this.series){
      this.series[index].check = this.seriesTodasSeleccionadas;
    }
    this.enviar();
  }

  enviar() {
    this.arrayAgrupados = [];
    this.arrayAgrupados.length = 0;
    this.stringAgrupados = "";
    let a = this.series.filter(opt => opt.check).map(opt => opt.id);
    this.arrayAgrupados.push(a);
    for(let i = 0; i < this.arrayAgrupados.length; i++){
      this.stringAgrupados += this.arrayAgrupados[i];
      if(this.arrayAgrupados.length > 1){
        this.stringAgrupados += ","
      }
      this.arrayAgrupados.length--;
    }
    this.SerieEvent.emit(this.stringAgrupados);
  }

}
