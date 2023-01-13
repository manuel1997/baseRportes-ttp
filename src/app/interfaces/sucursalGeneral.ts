export interface ISucursalGeneral{

    usuario?: string;
    password?: string;

    id_sucursal: number;
    nombre_sucursal: string;
    porcentaje_abandono: any;
    nivel_servicio: any;
    porcentaje_actividad: any;
    ejecutivos_atendiendo: number;
    ejecutivos_pausa: number;
    ejecutivos_desconectados: number;
    clientes_espera: number;
    tiempo_max_espera: number;
    tiempo_med_espera: number;
    tiempo_med_atencion: number;
    ticket_emitidos: number;
    clientes_atendidos: number;
    clientes_abandonados: number;

    id_usuario?: number;
    id_oficina?: number;
}
