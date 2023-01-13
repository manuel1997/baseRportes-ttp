import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
//import { TruncarTextoPipe } from '../../../pipes/truncar-texto.pipe';

//Interfaces
import { IVista } from '../../../../interfaces/vistaonline/vistaonline';

//Services
import { VistaonlineService } from '../../../../servicios/vistaonline/vistaonline.service';
import { ModalClientesService } from '../../../../servicios/vistaonline/modal-clientes.service';

@Component({
  selector: 'app-motivos-atencion',
  templateUrl: './motivos-atencion.component.html',
  styleUrls: ['./motivos-atencion.component.css']
})
export class MotivosAtencionComponent implements OnInit {
  @Input() dataShared = '';
  @Input() oficinaRecibida = '';
  @Input() servicios: any = [];

  @Output() oficinas: EventEmitter<any> = new EventEmitter<any>();
  // @Output() escritorios: EventEmitter<any> = new EventEmitter<any>();

  office: string = '';
  gifCarga = true;

  iVista: IVista = {
    usuario: localStorage.getItem('repousuario'),
    password: localStorage.getItem('repopassword'),
    id_usuario: Number(localStorage.getItem('repoid_usuario')),
    id_oficina: Number(localStorage.getItem('repooficinaSeleccionada'))
  };

  constructor(private _vistaonlineService: VistaonlineService, private _scripts: ModalClientesService) { }

  rows_servicios: any[] = [];
  array_escritorios: any[] = [];
  arrayOficinas: any[] = [];
  rows_cli: any[] = [];
  nombre_servicio: any = '';

  ngOnInit() {
    this.loadFullData();
  }

  loadFullData() {
    this.oficinaRecibida = this.office;
    this.arrayOficinas = this.array_escritorios;
    // console.log(this.servicios);

    this.gifCarga = false;
  }

  modal(clientes: any, nombre_servicio: string) {
    this.rows_cli = clientes;
    this.nombre_servicio = nombre_servicio;
    this._scripts.modal();
  }
}
