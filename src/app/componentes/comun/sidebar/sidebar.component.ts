import { Component, OnInit } from '@angular/core';
import { ScriptCollapseService } from '../../../servicios/script-collapse.service';
import { ScriptToggleService } from '../../../servicios/script-toggle.service';
import { MAIN } from '../../../config/url.servicios';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  ruta = MAIN;

  constructor(
    private _script: ScriptCollapseService,
    private _scriptToggle: ScriptToggleService
  ) {

  }

  ngOnInit() {
    this._script.collapseSidebar();
    this._scriptToggle.activeLink();
    this._scriptToggle.dataToggle();
  }

  verificarRedireccion() {
    localStorage.setItem('repoRedireccion', 'true');
  }
}
