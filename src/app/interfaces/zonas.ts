export interface IZonas{
        
    usuario?: string;
    password?: string;
    
    id_zona: number;
    nombre_zona: string;
    porcentaje_abandono: number;
    porcentaje_nivel_servicio: number;
    clientes_espera: number;
    tiempo_max_espera: number;
    tiempo_espera_promedio: number;
    tiempo_atencion_promedio: number;
    asistentes_atendiendo: number;
    asistentes_en_pausas: number;
    dotacion_sucursales: number;
    porcentaje_actividad: number;
    turnos_emitidos: number;
    clientes_atendidos: number;
    clientes_abandonados?: number;

    id_usuario?: number;
    id_oficina?: number;

}