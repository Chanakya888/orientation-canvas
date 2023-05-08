import React, { useState, useEffect } from "react";
import ArrowSvg from "../assets/arrow.svg";

const Direction = () => {
  const [error, setError] = useState(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    } else {
      setError("Device orientation not supported");
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, []);

  function handleOrientation(event) {
    let rotation = 0;
    if (event.webkitCompassHeading) {
      rotation = 360 - event.webkitCompassHeading;
    } else {
      rotation = event.alpha || 0;
    }
    setRotation(rotation);
  }

  return (
    <div>
      <img
        src={ArrowSvg}
        alt="arrow"
        style={{
          transform: `rotate(${-90 + rotation}deg)`,
          transition: "transform 0.2s ease-out",
        }}
      />
      <h1>{rotation.toFixed(2)}</h1>

      <h2>{error}</h2>
    </div>
  );
};

export default Direction;
