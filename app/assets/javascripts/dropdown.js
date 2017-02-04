$(document).ready(function(){
  $('.header-nav ul li').hover(function(){
    $(this).find('.sub-nav').toggle();
  });
});
