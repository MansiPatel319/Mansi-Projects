$(document).ready(function () {
  $("#category-slider-owl").owlCarousel({
    loop: true,
    nav: true,
    navText: [
      '<span class="span-roundcircle left-roundcircle"><span class="bg-custom-icon arrow-left-icon"> </span></span>',
      '<span class="span-roundcircle right-roundcircle"><span class="bg-custom-icon arrow-right-icon"> </span></span>',
    ],
    dots: true,
    dotsEach: true,
    stagePadding: 0,
    margin: 20,
    autoplay: false,
    slideSpeed: 300,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
        margin: 15,
      },
      600: {
        items: 2.3,
      },
      1200: {
        items: 3.1,
      },
      1600: {
        items: 4,
        slideBy: 1,
      },
    },
  });
});
