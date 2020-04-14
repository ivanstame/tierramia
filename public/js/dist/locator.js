import LatLon from 'https://cdn.jsdelivr.net/npm/geodesy@2.2.0/latlon-spherical.min.js';

  window.onload = function() {
    navigator.geolocation.getCurrentPosition(sortResults);
  }

function sortResults(position) {
    // Grab current position
    var latlon = new LatLon(position.coords.latitude, position.coords.longitude);
    return 2;

    var targets = document.getElementById('locations-container').getElementsByTagName('a');
    var targetedList = Array.from(targets);


    targetedList.sort(function(a,b){
      var locA  = a.getAttribute('data-latlon').split(',');
      var locB  = b.getAttribute('data-latlon').split(',');

      distA = latlon.distanceTo(new LatLon(Number(locA[0]),Number(locA[1])));
      distB = latlon.distanceTo(new LatLon(Number(locB[0]),Number(locB[1])));
      return distA - distB;
    });

    console.log(targetedList);

}
// window.onload = function(){
//   navigator.geolocation.getCurrentPosition(
//       function(position) {
//            alert("Lat: " + position.coords.latitude + "\nLon: " + position.coords.longitude);
//       },
//       function(error){
//            alert(error.message);
//       }, {
//            enableHighAccuracy: true
//                 ,timeout : 5000
//       }
//   );
// }
