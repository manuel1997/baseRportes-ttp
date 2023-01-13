import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ScriptCollapseService {

  constructor() { }

  collapseSidebar() {

    $(document).ready(function () {

      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('.top-button-ajuste').toggleClass('active');
      });

    });

  }
}
