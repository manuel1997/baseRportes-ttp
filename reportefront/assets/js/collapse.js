$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

  if($('li').hasClass('active1')){
    $('li.active1').parents('ul').addClass('show');
    $('li.active1').parents('ul').siblings('a.dropdown-toggle').attr('aria-expanded', 'true');
  }
});