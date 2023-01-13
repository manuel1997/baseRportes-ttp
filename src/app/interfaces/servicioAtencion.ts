export interface IServicioAtencion{

    id_servicio: number;
    nombre_servicio: string;

    clientes_espera: number;
    porcentaje_abandono: number;
    nivel_servicio: number;
    tiempo_max_espera: string;
    tiempo_medio_espera: string;
    tiempo_max_atencion: string;
    tiempo_medio_atencion: string;
    ticket_emitidos: number;
    clientes_atendidos: number;
    clientes_atendidos_especiales?: number;
    clientes_abandonados: number;
}
