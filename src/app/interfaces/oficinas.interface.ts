export interface IOficina{
    id_usuario?:number;
    usuario:string;
    password:string;
    
    id_oficina?:number;
    detalle?:string;
    fechaMin?:string;
    fechaMax?:string;

    fecha?:string;
    horaInicial?:string;
    horaFinal?:string;
    horaInicial2?:string;
    horaFinal2?:string;
    dias?:string;

    serie?:string;
    intervalo?:string;
}