var map;
function initMap() {
  var mapDiv = document.getElementById('panel-map');
  var myLatLng = {lat: 34.8469787, lng: -82.3944238};
  var markerLatLng = {lat: 34.8429787, lng: -82.4144238};
  var map = new google.maps.Map(mapDiv, {
    scrollwheel: false,
    center: myLatLng,
    zoom: 14,
    disableDefaultUI: true
  });
}
