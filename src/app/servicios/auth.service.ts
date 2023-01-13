import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //API_ENDPOINT = "http://127.0.0.1:8000/api/Reportes";

  constructor(/*private httpClient: HttpClient*/) { }

  logout(): void {
    localStorage.setItem('repoisLoggedIn', 'false');
    localStorage.removeItem('repousuario');
    localStorage.removeItem('reponombre_usuario');
    localStorage.removeItem('repousername');
    localStorage.removeItem('repopassword');
    localStorage.removeItem('repoid_usuario');
    localStorage.removeItem('repoapi_key');
    localStorage.removeItem('repooficinaSeleccionada');
    localStorage.removeItem('reponombreOficinaSeleccionada');
    localStorage.removeItem('repoidZona');
    localStorage.removeItem('repoid_zona');
    localStorage.removeItem('repolistaOficinas');
    localStorage.removeItem('repoidOficina');
    localStorage.removeItem('repoisLoggedIn');
    localStorage.removeItem('reponombreOficina');
    localStorage.removeItem('repoRedireccion');
  }
}
