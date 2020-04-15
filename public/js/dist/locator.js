
  window.onload = function() {
    navigator.geolocation.getCurrentPosition(sortResults);
    console.log(data);
  }

  var data = [{
          name: "lincoln-heights",
          lat: "34.072960",
          lng: "-118.218540",
      },{
          name: "long-beach",
          lat: "33.790100",
          lng: "-118.187460",
      }, {
          name: "pico-rivera",
          lat: "33.969300",
          lng: "-118.100610",
      }, {
          name: "highland-park",
          lat: "34.110840",
          lng: "-118.196210",
      }, {
          name: "huntington-park",
          lat: "33.977490",
          lng: "-118.225080",
      }, {
          name: "el-monte",
          lat: "34.073810",
          lng: "-118.022500",
      }, {
          name: "echo-park",
          lat: "34.078190",
          lng: "-118.263050",
      }, {
          name: "south-gate",
          lat: "33.951410",
          lng: "-118.182280",
      }, {
          name: "montebello",
          lat: "34.019040",
          lng: "-118.113140",
      }, {
          name: "lynwood",
          lat: "33.930100",
          lng: "-118.183390",
      }, {
          name: "west-covina",
          lat: "34.033030",
          lng: "-117.914680",
      }, {
          name: "downtown-la",
          lat: "34.045130",
          lng: "-118.251800",
      }, {
          name: "santa-fe-springs",
          lat: "33.946450",
          lng: "-118.084210",
      }, {
          name: "eastern-ave",
          lat: "34.061630",
          lng: "-118.175270",
      }, {
          name: "anaheim",
          lat: "33.842290",
          lng: "-117.889620",
      }, {
          name: "santa-ana",
          lat: "33.724610",
          lng: "-117.867940",
      }, {
          name: "la-habra",
          lat: "33.939730",
          lng: "-117.961270",
      }, {
          name: "san-francisco",
          lat: "37.745960",
          lng: "-122.419720",
      }, {
          name: "oakland",
          lat: "37.809190",
          lng: "-122.268170",
      }]

  function distance(lat1, lon1, lat2, lon2, unit) {
      var radlat1 = Math.PI * lat1/180
      var radlat2 = Math.PI * lat2/180
      var theta = lon1-lon2
      var radtheta = Math.PI * theta/180
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
          dist = 1;
      }
      dist = Math.acos(dist)
      dist = dist * 180/Math.PI
      dist = dist * 60 * 1.1515
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist
  }

  function sortResults(position) {
      // make variables for current position
      var poslat = position.coords.latitude;
      var poslng = position.coords.longitude;

      data.sort(function(a,b){
        distA = distance(poslat, poslng, a.lat, a.lng, "K")
        distB = distance(poslat, poslng, b.lat, b.lng, "K");
        return distA - distB;
      });
  }

  var nearestCafe = document.getElementById('nearest-cafe');

  nearestBtn.addEventListener('click', function(){
    console.log("#" + data[0].name);
    window.location.href = "#" + data[0].name;
  });
