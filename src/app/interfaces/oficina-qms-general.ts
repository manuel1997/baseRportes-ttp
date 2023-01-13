import { IOficinaQMS } from './oficina-qms';

export interface IOficinaQmsGeneral {
  errorCod: number;
  errorDesc: string;
  cantOfi: number;
  oficinas: IOficinaQMS;
}
