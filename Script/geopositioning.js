//function to check if the current browser has support for geolocation
function createDrivingDirectionsMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(OnSuccess, OnError, {
      //position options
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 500
    });
  } else {
    document.getElementById(map).innerHTML =
      "No support for geolocation, we can't find you :(";
  }
}

//Onsuccess call back
function OnSuccess(position) {
  showMap(position.coords.latitude, position.coords.longitude);
}

//Onerror callback function
function OnError() {
  var mapDiv = document.getElementById("map");
  switch (error.code) {
    case error.PERMISSION_DENIED:
      mapDiv.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      mapDiv.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      mapDiv.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      mapDiv.innerHTML = "An unknown error occurred.";
      break;
  }
}

//this will show the actual map based on our current location
function showMap(lat, lang) {
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();

  var route = {
    origin: new google.maps.LatLng(lat, lang),
    destination: "Ikorodu, Lagos",
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };

  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(50.85045, 4.34878),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById("driving-directions"));
  directionsService.route(route, function(result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(result);
    }
  });
}
