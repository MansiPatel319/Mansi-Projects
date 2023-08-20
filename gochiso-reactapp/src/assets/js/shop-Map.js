var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map-post-canvas"), {
    center: new google.maps.LatLng(40.7219097, -74.0039152),
    zoom: 16,
  });

  var iconBase = "http://65.1.29.208/HTML/mamoru-html/assets/images/icons/map/";

  var icons = {
    info: {
      icon: iconBase + "map-pin-01.png",
    },
  };

  var features = [
    {
      position: new google.maps.LatLng(40.7219097, -74.0039152),
      type: "info",
    },
  ];

  // Create markers.
  for (var i = 0; i < features.length; i++) {
    var marker = new google.maps.Marker({
      position: features[i].position,
      icon: icons[features[i].type].icon,
      map: map,
    });
  }
}
