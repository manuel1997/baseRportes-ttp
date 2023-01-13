import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { UserIdleService } from 'angular-user-idle';

import Swal from "sweetalert2";

//Servicios
import { ValidarTransaccionService } from '../../servicios/validar-transaccion.service';
//import { ApiTtpService } from '../../servicios/api-ttp.service';
import { LoginService } from '../../servicios/login.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  errorlogin: boolean = true;

  constructor(private validarService: ValidarTransaccionService,
              private userIdle: UserIdleService,
              // private _attp: ApiTtpService,
              private _login: LoginService,
              private _auth: AuthService,
              private router: Router,
              private _renderer:Renderer2) {
    this.login = new FormGroup({
      'usuario': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required]),
      'captcha': new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
    let script = this._renderer.createElement('script');
    script.defer = true;
    script.async = true;
    script.src = "https://www.google.com/recaptcha/api.js";
    this._renderer.appendChild(document.body, script);

    if (localStorage.getItem('repoRedireccion') === 'false') {
      this._auth.logout();
    }
  }

  resolved(captchaResponse: string) {
    this.login.get('captcha').setValue(captchaResponse)    
  }


  /*login_reporte2(){
    this._attp.login(this.login.value).subscribe( data=>{
      if(data["data"].substring(14, data["data"].length - 5).split("~").length > 2){
        localStorage.setItem("usuario", this.login.value.usuario);
        localStorage.setItem("password", this.login.value.password);
        localStorage.setItem("id_usuario", data["data"].split("~")[1]);
        localStorage.setItem("isLoggedIn", 'true');
        this.router.navigate(['home']);
      }
      else {
        this.errorlogin = false;
      }
    })
  }*/

  async login_reporte() {
    if (this.login.get('usuario').errors && this.login.get('usuario').touched||this.login.get('usuario').errors && this.login.get('usuario').untouched ) {
      Swal("Error","Usuario requerido","error");
    }else
         if(this.login.get('password').errors &&  this.login.get('password').touched||this.login.get('password').errors &&  this.login.get('password').untouched) {
      Swal("Error","Clave requerida","error");
    }else
    if(this.login.get('captcha').errors &&  this.login.get('captcha').touched||this.login.get('captcha').errors &&  this.login.get('captcha').untouched) {
      Swal("Error","captcha requerida","error");
    }else
    if (this.login.invalid) {
        return;
    }
    else{
      /* this._login.login(this.login.value).subscribe((data) => {
        let datos = data['data'].split('~');
        var resultado = this.validarService.validarError(data);
        if(resultado == 'ok'){
          // if (datos.toString().substring(6, 11) != '00023' && datos.toString().substring(6, 11) != '00022') {
          if (datos.length > 2) {
            localStorage.setItem("repousuario", this.login.value.usuario);
            localStorage.setItem("repopassword", this.login.value.password);
            localStorage.setItem("repoid_usuario", datos[1]);
            localStorage.setItem('repousername', datos[2]);
            localStorage.setItem("repoisLoggedIn", 'true');
            localStorage.setItem('repoRedireccion', 'false');
            localStorage.setItem('repooficinaSeleccionada', '-1');
            // this.router.navigate(['home']);
            this.router.navigate(['dashboard']);

            this.userIdle.startWatching();
            this.userIdle.onTimerStart().subscribe();
            this.userIdle.onTimeout().subscribe(() => {
              this._auth.logout();
              this.router.navigate(['/login']);
            });

            // this.getToken();
          } else {
            Swal('Error', 'Usuario o contraseñas erróneos', 'error');
            this.errorlogin = false;
          }
        }
        else{
          Swal('Error','Debe ingresar datos correctamente',"error");
          this.errorlogin = false;
        }

      }, (error) => {
        Swal('Error','Ocurrió un error',"error");
        console.log(error);
        this.errorlogin = false;
      }); */

      let data = await this._login.login(this.login.value);
      if (data['data'] == '' || data['data'] == undefined) {
        Swal('Error', 'Se ha producido un error.', 'error');
      } else {
        let datos = data['data'].split('~');
        var resultado = this.validarService.validarError(data);
        if(resultado == 'ok'){
          // if (datos.toString().substring(6, 11) != '00023' && datos.toString().substring(6, 11) != '00022') {
          if (datos.length > 2) {
            localStorage.setItem("repousuario", this.login.value.usuario);
            localStorage.setItem("repopassword", this.login.value.password);
            localStorage.setItem("repoid_usuario", datos[1]);
            localStorage.setItem('repousername', datos[2]);
            localStorage.setItem("repoisLoggedIn", 'true');
            localStorage.setItem('repoRedireccion', 'false');
            localStorage.setItem('repooficinaSeleccionada', '-1');
            // this.router.navigate(['home']);
            this.router.navigate(['dashboard']);

            this.userIdle.startWatching();
            this.userIdle.onTimerStart().subscribe();
            this.userIdle.onTimeout().subscribe(() => {
              this._auth.logout();
              this.router.navigate(['/login']);
            });
          } else {
            Swal('Error', 'Usuario o contraseñas erróneos', 'error');
            this.errorlogin = false;
          }
        }
        else{
          Swal('Error','Debe ingresar datos correctamente',"error");
          this.errorlogin = false;
        }
      }
    }
  }
}
