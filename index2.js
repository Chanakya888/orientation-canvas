var currentLat, currentLng;

function logMovement(direction, distance) {
  let doc = document.getElementById("values");
  doc.innerText = "direction" + direction + distance + "distance";
}

function successCallback(position) {
  var newLat = position.coords.latitude;
  var newLng = position.coords.longitude;

  if (currentLat && currentLng) {
    var distance = calculateDistance(currentLat, currentLng, newLat, newLng);

    if (newLat > currentLat && distance >= 2) {
      logMovement("north", distance);
    } else if (newLat < currentLat && distance >= 2) {
      logMovement("south", distance);
    } else if (newLng > currentLng && distance >= 2) {
      logMovement("east", distance);
    } else if (newLng < currentLng && distance >= 2) {
      logMovement("west", distance);
    }
  }

  currentLat = newLat;
  currentLng = newLng;
}

function errorCallback(error) {
  console.log(error);
}

if ("permissions" in navigator) {
  navigator.permissions.query({ name: "geolocation" }).then(function (result) {
    if (result.state == "granted") {
      navigator.geolocation.watchPosition(successCallback, errorCallback);
    } else if (result.state == "prompt") {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation permission denied");
    }
  });
} else {
  navigator.geolocation.watchPosition(successCallback, errorCallback);
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  var R = 6371000; // Earth's radius in meters
  var φ1 = toRadians(lat1);
  var φ2 = toRadians(lat2);
  var Δφ = toRadians(lat2 - lat1);
  var Δλ = toRadians(lng2 - lng1);

  var a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c;

  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
