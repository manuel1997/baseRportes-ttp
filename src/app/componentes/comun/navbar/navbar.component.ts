import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Services
import { AuthService } from '../../../servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nombre_usuario: string;

  constructor(
    private router: Router,
    public authService: AuthService
    ) {}

  ngOnInit() {
    this.nombre_usuario = localStorage.getItem('repousername');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
