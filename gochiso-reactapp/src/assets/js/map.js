$(document).ready(function () {
  $(".dropselect").dropselect();

  wow = new WOW({
    animateClass: "animated",
    offset: 10,
    animationDuration: 2000
  });
  wow.init();

  $("#open-full-map").click(function() {
    $("#main-map-div").toggleClass("active");
  });
});
