export interface ISucursal{

    usuario?: string;
    password?: string;

    clientes_atendidos?: number;
    asistentes_sucursal?:  number;
    tiempo_maximo_espera?: string;
    clientes_espera?: number;
    asistentes_atendiendo?: number;
    tiempo_medio_atencion?: string;
    abandono_total?: number;
    actividad_asist?: number;
    asistente_pausa?: number;
    tiempo_medio_espera?: string;
    estado_oficina?: string;
    hora_servidor?: string;

    id_usuario?: number;
    id_oficina?: number;
}
