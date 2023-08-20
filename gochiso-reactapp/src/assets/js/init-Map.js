let allMarkers = [];
function initMap() { 
    var uluru = {lat: -33.028249, lng: 150.274856};
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 8,
      center: uluru,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var contentString = '<div class="image-map-grid-pop-card image-round-grid-card">' +
        '<div class="category-slider-box">' +

          '<div class="category-img-thumb">' +
            '<div class="img-thumb">' +
              '<img src="assets/images/category/category-img-02.jpg" alt="image" class="img-fluid img-responsive" />'+
            '</div>' +
          '</div>' +

        
        '<div class="category-content-div">' +
          '<div class="category-content-row">' +

            '<div class="category-content-top-div">' +
              '<div class="category-content-top-left">' +
                '<h3><a href="#" class="link">Cras ultricies ligula sed</a> </h3>' +
              '</div>' +
              '<div class="category-content-top-right">' +
                '<div class="rating-div">' +
                  '<span class="icon-span"> <img src="assets/images/icons/google.svg" class="img-fluid" alt="icon"> </span>' +
                  '<span class="text">4.0</span>' +
                '</div>' +
              '</div>' +
            '</div>' +

          '</div>' +
        '</div>' +
        '</div>' +
'</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var icon1 = "http://65.1.29.208/HTML/mamoru-html/assets/images/icons/map/map-pin-01.png";
    var icon2 = "http://65.1.29.208/HTML/mamoru-html/assets/images/icons/map/map-pin-hover-01.png";
    var marker = "";
    

    var locations = [
        ['Branch1', -33.028249, 151.244856, 1],
        ['Branch2', -32.923036, 150.259052, 2],
        ['Branch3', -32.80576, 149.970872, 3],
        ['Branch4', -33.800101, 150.000000, 4],
        ['Branch5', -33.953228, 151.247040, 5],
        ['Branch6', -32.450198, 150.294302, 6],
        ['Branch7', -33.817958, 150.0138238, 7],
        ['Branch8', -32.250198, 150.218302, 8],
      ];

    for (i = 0; i < locations.length; i++) {  
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: map,
          id: 'marker'+i,
          icon: icon1,
        });

        allMarkers.push(marker);

        /* marker.addListener('click', function() {
           infowindow.open(map, marker);
           $('#map-owl-slider-card').owlCarousel({
             loop: true, nav: true,
             navText: ['<span class="span-roundcircle left-roundcircle"><span class="material-icons">chevron_left </span>', '<span class="span-roundcircle right-roundcircle"><span class="material-icons">chevron_right </span></span>'], items: 1,
             singleItem: true
           });
           $('#like-btn1').on('click', function(){
               $(this).toggleClass("active");
           });
         });

          google.maps.event.addListener(infowindow, 'domready', function (event) {
           $('#map-owl-slider-card').owlCarousel({
           loop: true, nav: true,
             navText: ['<span class="span-roundcircle left-roundcircle"><span class="material-icons">chevron_left </span>', '<span class="span-roundcircle right-roundcircle"><span class="material-icons">chevron_right </span></span>'], items: 1,
             singleItem: true 
           });
           $('#like-btn1').on('click', function(){
             $(this).toggleClass("active");
           });
         }); */
        google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {        
          return function() {
            marker.setIcon(icon2);
          }
        })(marker, i));
        google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {        
          return function() {
            marker.setIcon(icon1);
          }
        })(marker, i));
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          
            /*$('#map-owl-slider-card').owlCarousel({
              loop: true,
              nav: true,
              navText: ['<span class="span-roundcircle left-roundcircle"><span class="material-icons">chevron_left </span>', '<span class="span-roundcircle right-roundcircle"><span class="material-icons">chevron_right </span></span>'],
              items: 1,
              singleItem: true,
            });
            $('#like-btn1').on('click', function(){
              $(this).toggleClass("active");
            });
            */
          return function() {
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
          }
        })(marker, i));
        google.maps.event.addListener(infowindow, 'domready', function (event) {
          /* $('#map-owl-slider-card').owlCarousel({ loop: true, nav: true,
               navText: ['<span class="span-roundcircle left-roundcircle"><span class="material-icons">chevron_left </span>', '<span class="span-roundcircle right-roundcircle"><span class="material-icons">chevron_right </span></span>'], items: 1,
               singleItem: true })
               $('#like-btn1').on('click', function(){
                 $(this).toggleClass("active");
               });
               // jQuery('[data-toggle="tooltip"]').tooltip({placement:'bottom'});
               $('[data-toggle="tooltip"]').tooltip({html: true, animation: true, trigger: "hover" }); */
          });
      }
  }

  var icon1 = "http://65.1.29.208/HTML/suppersocial/assets/images/icons/map-pin/map-pin.png";
  var icon2 = "http://65.1.29.208/HTML/suppersocial/assets/images/icons/map-pin/map-pin-hover.png";
  $(".marker-hover-effect").mouseover(function(){
    var curretnId = $(this).data('custom-id');
    for ( var i = 0; i< allMarkers.length; i++) {
      if (curretnId === allMarkers[i].id) {
        allMarkers[i].setIcon(icon2);
        break;
      }
    }
  });
  $(".marker-hover-effect").mouseout(function(){
    var curretnId = $(this).data('custom-id');
    for ( var i = 0; i< allMarkers.length; i++) {
      if (curretnId === allMarkers[i].id) {
        allMarkers[i].setIcon(icon1);
        break;
      }
    }
  });
  // function hover(id) {
  //   for ( var i = 0; i< allMarkers.length; i++) {
  //       if (id === allMarkers[i].id) {
  //         allMarkers[i].setIcon(icon1);
  //         break;
  //       }
  // }
  // }

  // //Function called when out the div
  // function out(id) {  
  //   for ( var i = 0; i< allMarkers.length; i++) {
  //       if (id === allMarkers[i].id) {
  //         allMarkers[i].setIcon(icon2);
  //         break;
  //       }
  // }
  // }