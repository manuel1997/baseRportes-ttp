export class Config{

    protected API_ENDPOINT: string;
    protected API_SERVICIOS: string;
    protected user: string;
    protected password: string;

    constructor(){
      // this.API_ENDPOINT = "http://172.16.32.56:84/Apiconsultora/public/api";
      // this.API_SERVICIOS = "http://172.16.33.43:82/api/v1/generarTraza";
      this.user = localStorage.getItem('repousuario');
      this.password = localStorage.getItem('repopassword');
    }


}
