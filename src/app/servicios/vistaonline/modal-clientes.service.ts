import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ModalClientesService {
  constructor() { }
  modal() {
    $(document).ready(function() {
        if (!($('.modal.in').length)) {
          $('.modal-dialog').css({
            top: 0,
            left: 0
          });
        }
        $('#myModal').modal({
          backdrop: false,
          show: true
        });

        $('.modal-dialog').draggable({
          handle: '.modal-header'
        });
    });
  }
}
