/* Set navigation */

function openNav() {
  $("#mySidenav").addClass("width80");
  $("#nav-res").addClass("opacityon");
  $(".cd-shadow-layer").addClass("displayblock");
  $(".wrapper").addClass("position-fixed");
  $("body").addClass("overflow-fixed");
}

function closeNav() {
  $("#mySidenav").removeClass("width80");
  $("#nav-res").removeClass("opacityon");
  $(".cd-shadow-layer").removeClass("displayblock");
  $(".wrapper").removeClass("position-fixed");
  $("body").removeClass("overflow-fixed");
} 

$(document).ready(function(){ 

  $(".cd-shadow-layer").click(function(){
    closeNav(); 
  });

  "use strict";
  
  // var c, currentScrollTop = 0,
  //  navbar = $(".header-div");
 
   
    // $(window).scroll(function () {
    //   var a = $(window).scrollTop();
    //   var b = navbar.height();
    
    //   currentScrollTop = a;
    
    //   if (c < currentScrollTop && a > b + b) {
    //     navbar.addClass("scrollUp");
    //     navbar.removeClass("header-bgcolor");
    //   } else if (c > currentScrollTop && !(a <= b)) {
    //     navbar.removeClass("scrollUp");
    //     navbar.addClass("header-bgcolor");
    //   }
    //   c = currentScrollTop;

    //   if (a <= 150) navbar.removeClass("header-bgcolor");
    // });
});