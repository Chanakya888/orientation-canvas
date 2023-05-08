import React, { useState, useEffect } from "react";
import ArrowSvg from "../assets/arrow.svg";

const Direction = () => {
  const [compassHeading, setCompassHeading] = useState(0);

  const handleDeviceMotion = (event) => {
    const { webkitCompassHeading, mozCompassHeading } = event;

    const heading = webkitCompassHeading || mozCompassHeading;
    if (heading) {
      setCompassHeading(heading);
    }
  };

  useEffect(() => {
    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", handleDeviceMotion);
    } else {
      alert("Your device does not support DeviceMotion events.");
    }

    return () => {
      window.removeEventListener("devicemotion", handleDeviceMotion);
    };
  }, []);

  return (
    <div>
      <div>
        <h2>Phone's direction:</h2>
        <p>{compassHeading.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Direction;
