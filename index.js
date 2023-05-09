var granimInstance = new Granim({
  element: ".canvas-gradient",
  name: "interactive-gradient",
  elToSetClassOn: ".canvas-interactive-wrapper",
  direction: "diagonal",
  isPausedWhenNotInView: true,
  stateTransitionSpeed: 1000,
  states: {
    "default-state": {
      gradients: [["#B3FFAB", "#12FFF7"]],
      transitionSpeed: 2000,
    },
    "violet-state": {
      gradients: [["#9D50BB", "#6E48AA"]],
      transitionSpeed: 2000,
    },
    "orange-state": {
      gradients: [["#FF4E50", "#F9D423"]],
      loop: false,
    },
  },
  onReady: function () {
    granimInstance.changeState("default-state");
  },
});

// $(document).on("orientationChange", (event, data) => {
//   console.log("new change", data.normalized.alpha);

//   var arrow = document.getElementById("right-arrow");
//   var alpha = data.normalized.alpha;
//   var beta = data.normalized.beta;
//   var gamma = data.normalized.gamma;
//   console.log(getOrientation(alpha, beta, gamma));
//   const values = document.getElementById("values");
//   values.innerText =
//     "alpha" + alpha.toFixed(2) + "beta" + beta + "gamma" + gamma;
//   arrow.style.transform = "rotate(" + (alpha - 90) + "deg)";
// });

// function getOrientation(alpha, beta, gamma) {
//   if (beta > 45 && beta < 135) {
//     granimInstance.changeState("default-state");
//     return "screen facing up";
//   } else if (beta < -45 && beta > -135) {
//     granimInstance.changeState("violet-state");
//     return "screen facing down";
//   } else if (gamma > 45) {
//     granimInstance.changeState("violet-state");
//     return "landscape mode (right)";
//   } else if (gamma < -45) {
//     granimInstance.changeState("orange-state");
//     return "landscape mode (left)";
//   }
// }

// Check if the browser supports Geolocation API and DeviceMotion API
if (navigator.geolocation && window.DeviceMotionEvent) {
  // Request permission to access GPS sensor
  navigator.permissions.query({ name: "geolocation" }).then(function (result) {
    if (result.state === "granted") {
      // Access GPS sensor and update position
      navigator.geolocation.watchPosition(function (position) {
        var lat1 = position.coords.latitude;
        var lon1 = position.coords.longitude;
        var lastPos = { lat: lat1, lon: lon1 };
        console.log(lat1, lon1);

        // Use accelerometer to determine movement
        window.addEventListener("devicemotion", function (event) {
          var x = event.accelerationIncludingGravity.x;
          var y = event.accelerationIncludingGravity.y;
          var z = event.accelerationIncludingGravity.z;

          // Calculate total acceleration
          var acceleration = Math.sqrt(x * x + y * y + z * z);

          console.log(acceleration, x, y, z);
          // Check if the user is moving
          if (acceleration > 1) {
            // Get the current position and calculate the distance traveled
            navigator.geolocation.getCurrentPosition(function (position) {
              var lat2 = position.coords.latitude;
              var lon2 = position.coords.longitude;
              var currentPos = { lat: lat2, lon: lon2 };
              var distance = getDistanceFromLatLonInMeters(
                lastPos.lat,
                lastPos.lon,
                currentPos.lat,
                currentPos.lon
              );
              console.log(distance);
              // Check if the user has moved more than 10 meters
              if (distance > 1) {
                // Display an alert message
                alert("You have moved more than 5 meters!");
                // Update the last position
                lastPos = currentPos;
              }
            });
          }
        });
      });
    } else if (result.state === "prompt") {
      // Prompt the user for permission to access the GPS sensor
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Access GPS sensor and update position
          navigator.geolocation.watchPosition(function (position) {
            // ...
          });
        },
        function () {
          // Handle error when the user denies permission
          alert(
            "You have denied access to the GPS sensor. Please enable location services to use this feature."
          );
        }
      );
    }
  });
} else {
  // Handle error when the browser does not support the required APIs
  alert(
    "Your browser does not support the Geolocation API or the DeviceMotion API. Please use a different browser to use this feature."
  );
}

// Function to calculate the distance between two latitudes and longitudes in meters
function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c * 1000; // Distance in meters
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
