import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//Servicios
import { ApiTtpService } from '../../../../../servicios/api-ttp.service';

@Component({
  selector: 'app-produccion-reporte',
  templateUrl: './produccion-reporte.component.html',
  styleUrls: ['./produccion-reporte.component.css']
})
export class ProduccionReporteComponent implements OnInit {
  @Output() btnVolver: EventEmitter<any> = new EventEmitter<any>();

  datos:any[] = [];
  titulo:any[] = [];
  superior:any[] = [];

  agrupado:string;
  periodo:string;
  agr_col:string;
  per_col:any[] = [];
  gifCarga = true;

  diario = ["8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h", "19h", "20h", "21h", "22h"];
  semana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  constructor(private _api: ApiTtpService) {

  }

  ngOnInit() {
  }

  cargarDatos(registros) {
    this.superior.length = 0;
    this.datos.length = 0;
    this.agrupado = "";
    this.periodo = "";
    this.agrupado = this._api.rps_reporteProduccion.agrupado;
    this.periodo = this._api.rps_reporteProduccion.periodo;
    for (let index = 0; index < registros.length; index++) {
      let campos = registros[index].split("~");
      if (index == 0) {
        this.superior = campos;
      } else {
        switch (this.periodo) {
          case 'D':
            this.datos.push({
              "eje":campos[0],
              "normal": "Atenciones\nTiempo(min)\n%On-Off",
              "ocho":[campos[1]+'\n'+campos[2]+'\n'+campos[3]],
              "nueve": [campos[4]+'\n'+campos[5]+'\n'+campos[6]],
              "diez": [campos[7]+'\n'+campos[8]+'\n'+campos[9]],
              "once": [campos[10]+'\n'+campos[11]+'\n'+campos[12]],
              "doce": [campos[13]+'\n'+campos[14]+'\n'+campos[15]],
              "trece": [campos[16]+'\n'+campos[17]+'\n'+campos[18]],
              "catorce": [campos[19]+'\n'+campos[20]+'\n'+campos[21]],
              "quince": [campos[22]+'\n'+campos[23]+'\n'+campos[24]],
              "dieciseis": [campos[25]+'\n'+campos[26]+'\n'+campos[27]],
              "diecisiete": [campos[28]+'\n'+campos[29]+'\n'+campos[30]],
              "dieciocho": [campos[31]+'\n'+campos[32]+'\n'+campos[33]],
              "diecinueve": [campos[34]+'\n'+campos[35]+'\n'+campos[36]],
              "veinte": [campos[37]+'\n'+campos[38]+'\n'+campos[39]],
              "veintiuno": [campos[40]+'\n'+campos[41]+'\n'+campos[42]],
              "veintidos": [campos[43]+'\n'+campos[44]+'\n'+campos[45]],
              "Total": [campos[46]+'\n'+campos[47]+'\n'+campos[48]]
            });
          break;

          case 'S':
            this.datos.push({
              "eje":campos[0],
              "normal": "Atenciones\nTiempo(min)\n%On-Off",
              "Lun":[campos[1]+'\n'+campos[2]+'\n'+campos[3]],
              "Mar": [campos[4]+'\n'+campos[5]+'\n'+campos[6]],
              "Mie": [campos[7]+'\n'+campos[8]+'\n'+campos[9]],
              "Jue": [campos[10]+'\n'+campos[11]+'\n'+campos[12]],
              "Vie": [campos[13]+'\n'+campos[14]+'\n'+campos[15]],
              "Sab": [campos[16]+'\n'+campos[17]+'\n'+campos[18]],
              "Dom": [campos[19]+'\n'+campos[20]+'\n'+campos[21]],
              "Total": [campos[22]+'\n'+campos[23]+'\n'+campos[24]]
            });
          break;

          case 'M':
            this.datos.push({
              "eje":campos[0],
              "normal": "Atenciones\nTiempo(min)\n%On-Off",
              "dia1":[campos[1]+'\n'+campos[2]+'\n'+campos[3]],
              "dia2": [campos[4]+'\n'+campos[5]+'\n'+campos[6]],
              "dia3": [campos[7]+'\n'+campos[8]+'\n'+campos[9]],
              "dia4": [campos[10]+'\n'+campos[11]+'\n'+campos[12]],
              "dia5": [campos[13]+'\n'+campos[14]+'\n'+campos[15]],
              "dia6": [campos[16]+'\n'+campos[17]+'\n'+campos[18]],
              "dia7": [campos[19]+'\n'+campos[20]+'\n'+campos[21]],
              "dia8": [campos[22]+'\n'+campos[23]+'\n'+campos[24]],
              "dia9": [campos[25]+'\n'+campos[26]+'\n'+campos[27]],
              "dia10": [campos[28]+'\n'+campos[29]+'\n'+campos[30]],
              "dia11": [campos[31]+'\n'+campos[32]+'\n'+campos[33]],
              "dia12": [campos[34]+'\n'+campos[35]+'\n'+campos[36]],
              "dia13": [campos[37]+'\n'+campos[38]+'\n'+campos[39]],
              "dia14": [campos[40]+'\n'+campos[41]+'\n'+campos[42]],
              "dia15": [campos[43]+'\n'+campos[44]+'\n'+campos[45]],
              "dia16": [campos[46]+'\n'+campos[47]+'\n'+campos[48]],
              "dia17": [campos[49]+'\n'+campos[50]+'\n'+campos[51]],
              "dia18": [campos[52]+'\n'+campos[53]+'\n'+campos[54]],
              "dia19": [campos[55]+'\n'+campos[56]+'\n'+campos[57]],
              "dia20": [campos[58]+'\n'+campos[59]+'\n'+campos[60]],
              "dia21": [campos[61]+'\n'+campos[62]+'\n'+campos[63]],
              "dia22": [campos[64]+'\n'+campos[65]+'\n'+campos[66]],
              "dia23": [campos[67]+'\n'+campos[68]+'\n'+campos[69]],
              "dia24": [campos[70]+'\n'+campos[71]+'\n'+campos[72]],
              "dia25": [campos[73]+'\n'+campos[74]+'\n'+campos[75]],
              "dia26": [campos[76]+'\n'+campos[77]+'\n'+campos[78]],
              "dia27": [campos[79]+'\n'+campos[80]+'\n'+campos[81]],
              "dia28": [campos[82]+'\n'+campos[83]+'\n'+campos[84]],
              "dia29": [campos[85]+'\n'+campos[86]+'\n'+campos[87]],
              "dia30": [campos[88]+'\n'+campos[89]+'\n'+campos[90]],
              "dia31": [campos[91]+'\n'+campos[92]+'\n'+campos[93]],
              "Total": [campos[94]+'\n'+campos[95]+'\n'+campos[96]]
            });
          break;

          default:
          break;
        }
      }
    }
    this.columnas(this.agrupado, this.periodo);

    this.gifCarga = false;
  }

  columnas(agrupado, periodo){
    this.per_col.length = 0;
    this.per_col = [];
    this.semana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    if (agrupado == "0") {
      this.agr_col = 'Ejecutivo';
    } else {
      this.agr_col = 'Escritorio';
    }

    switch (periodo) {
      case 'D':
        for (let index = 8; index < 23; index++) {
          this.per_col.push(index);
        }
      break;

      case 'S':
        this.per_col = this.semana;
      break;

      case 'M':
      for (let index = 1; index < 32; index++) {
        this.per_col.push(index);
      }
      break;

      default:
      break;
    }

  }

  atras(){
    this.btnVolver.emit("");
  }

}
