import React, { useState, useEffect } from "react";
import ArrowSvg from "../assets/arrow.svg";

const Direction = () => {
  const [rotation, setRotation] = useState(0);

  const handleDeviceOrientation = (event) => {
    const { alpha } = event;
    setRotation(alpha);
  };

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    } else {
      alert("Your device does not support DeviceOrientation events.");
    }

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, []);

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
      <h1>{rotation}</h1>
    </div>
  );
};

export default Direction;
