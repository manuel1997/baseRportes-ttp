import { IAsistente } from '../asistente';
import { ICliente } from './vistacliente';

export interface IVistaOnline {
  usuario: string;
  password: string;
  id_usuario: number;
  id_oficina?: number;
  nombre_oficina?: string;
  max_cliente?: number;
  nombre_servicio?: string;
  id_servicio?: number;
  letra_servicio?: string;
  alarma_espera?: any;
  alarma_atencion?: any;
  string_escritorios?: string;
  cantidad_clientes?: any;
  tiempo_promedio?: any;
  tiempo_maximo?: any;

  escritorios?: IAsistente[];
  clientes?: ICliente[];
}
