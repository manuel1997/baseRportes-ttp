import { Component, OnInit, EventEmitter, Output } from '@angular/core';

//Servicios
import { ApiTtpService } from '../../../servicios/api-ttp.service';
import Swal from 'sweetalert2';
import { ValidarTransaccionService } from '../../../servicios/validar-transaccion.service';

@Component({
  selector: 'app-oficinas',
  templateUrl: './oficinas.component.html',
  styleUrls: ['./oficinas.component.css']
})
export class OficinasComponent implements OnInit {

  @Output() OficinaEvent : EventEmitter<any> = new EventEmitter();

  oficinas: any[] = [];
  oficinas_selec: Array<string> = [];

  oficinasTodasSeleccionadas: any;

  arrayAgrupados: Array<any> = [];
  stringAgrupados: string = '';

  constructor(private ttp: ApiTtpService, private validarService: ValidarTransaccionService) {
    this.obtener_oficinas();
  }

  ngOnInit() {
  }

  async obtener_oficinas() {
    /* this.ttp.obtener_oficinas().subscribe( data=>{
      let registros = data["data"].substring(14, data["data"].length - 5).split("|");
      for (let index = 0; index < registros.length; index++) {
        let campos = registros[index].split("~");
        this.oficinas.push({"id":campos[0], "oficina": campos[1], "fechamin": campos[2], "fechamax": campos[3],"check": false});
      }
    }); */
    let data = await this.ttp.obtener_oficinas();
    if (data['data'] == '' || data['data'] == undefined) {
      Swal('Error', 'Se ha producido un error.', 'error');
    } else {
      if (this.validarService.validarError(data) == 'ok') {
        let registros = data['data'].substring(14, data['data'].length - 5).split('|');
        for (let index = 0; index < registros.length; index++) {
          let campos = registros[index].split('~');
          this.oficinas.push({'id': campos[0], 'oficina': campos[1], 'fechamin': campos[2], 'fechamax': campos[3], 'check': false});
        }
      } else {
        Swal('Error', this.validarService.validarError(data), 'error');
      }
    }
  }

  marcar(e) {
    this.enviar();
  }

  seleccionarTodasLasOficinas() {
    for (let i = 0; i < this.oficinas.length; i++) {
      this.oficinas[i].check = this.oficinasTodasSeleccionadas;
    }
    this.enviar();
  }


  checKSeleccionarOficinas() {
    this.oficinasTodasSeleccionadas = this.oficinas.every(function(item: any) {
      return item.check == true;
    });
  }

  enviar() {
    this.arrayAgrupados = [];
    // this.arrayAgrupados.length = 0;
    this.stringAgrupados = '';
    let a = this.oficinas.filter(opt => opt.check).map(opt => opt.id);
    this.arrayAgrupados.push(a);
    for (let i = 0; i < this.arrayAgrupados.length; i++) {
      this.stringAgrupados += this.arrayAgrupados[i];
      if (this.arrayAgrupados.length > 1) {
        this.stringAgrupados += ','
      }
      this.arrayAgrupados.length--;
    }
    this.OficinaEvent.emit(this.stringAgrupados);
  }

}
