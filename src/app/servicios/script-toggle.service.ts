import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ScriptToggleService {

  constructor() {

  }

  activeLink() {
    $(document).ready(function () {
      if($('li').hasClass('active1')){
        $('li.active1').parents('ul').addClass('show');
        $('li.active1').parents('ul').siblings('a.dropdown-toggle').attr('aria-expanded', 'true');
      }
    });
  }

  dataToggle() {
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip({
        trigger : 'manual'
      });
      
      $('[data-toggle=tooltip]').hover(function(){
        // on mouseenter
        $(this).tooltip('show');
        // console.log('hover 1');
      }, function(){
        // on mouseleave
        $(this).tooltip('hide');
      });

      $('[data-toggle=tooltip]').click(function(){
        // console.log('click 1');
        $(this).tooltip('hide');
      });

      /*$('body').on('click','[data-toggle=tooltip]',function(){
        // $(this).tooltip('hide');
        console.log('click 2');
        // console.log($(this));
      })*/
    });
  }
  
}