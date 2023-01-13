export interface ICargaDeTrabajoDiaria{
    hora                    :string;
    turnosEmitidos          :string;
    turnosAtendidosNormal   :string;
    turnosAtendidosTOL      :string;
    turnosAtendidosEspecial :string;
    turnosPerdidos          :string;
    turnosPerdidosTOL       :string;
    ejecutivosActivos       :string;
    esperaMedia?            :string;
    deltaEsperaMedia?       :string;
}