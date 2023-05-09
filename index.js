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

$(document).on("orientationChange", (event, data) => {
  console.log("new change", data.normalized.alpha);

  var arrow = document.getElementById("right-arrow");
  var alpha = data.normalized.alpha;
  var beta = data.normalized.beta;
  var gamma = data.normalized.gamma;
  console.log(getOrientation(alpha, beta, gamma));
  arrow.style.transform = "rotate(" + (alpha - 90) + "deg)";
});

function getOrientation(alpha, beta, gamma) {
  if (beta > 45 && beta < 135) {
    granimInstance.changeState("default-state");
    return "screen facing up";
  } else if (beta < -45 && beta > -135) {
    granimInstance.changeState("violet-state");
    return "screen facing down";
  } else if (gamma > 45) {
    granimInstance.changeState("violet-state");
    return "landscape mode (right)";
  } else if (gamma < -45) {
    granimInstance.changeState("orange-state");
    return "landscape mode (left)";
  }
}
