import { IServiciosGeneral } from './servicios-general';

export interface IZonasGeneral {
  usuario?: string;
    password?: string;

    id_zona: number;
    nombre_zona: string;
    porcentaje_abandono: number;
    porcentaje_nivel_servicio: number;
    clientes_espera: number;
    tiempo_max_espera: any;
    tiempo_espera_promedio: any;
    tiempo_atencion_promedio: any;
    asistentes_atendiendo: number;
    asistentes_en_pausas: number;
    dotacion_sucursales: number;
    porcentaje_actividad: number;
    turnos_emitidos: number;
    clientes_atendidos: number;
    clientes_abandonados?: number;
    clientes_perdidos?: number;

    id_usuario?: number;
    id_oficina?: number;

    servicios?: IServiciosGeneral[];
    especiales?: any;
    normales?: any;
    tol?: any;
    totales?: any;
}
