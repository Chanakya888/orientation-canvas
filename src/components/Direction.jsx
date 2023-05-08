import React, { useState, useEffect } from "react";
import ArrowSvg from "../assets/arrow.svg";

const Direction = () => {
  const [direction, setDirection] = useState("");
  const [error, setError] = useState(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          window.addEventListener("deviceorientation", handleOrientation);

          function handleOrientation(event) {
            const alpha = event.alpha;
            let rot = 0;
            if (alpha >= 315 || alpha < 45) {
              rot = 0;
            } else if (alpha >= 45 && alpha < 135) {
              rot = 90;
            } else if (alpha >= 135 && alpha < 225) {
              rot = 180;
            } else if (alpha >= 225 && alpha < 315) {
              rot = -90;
            }
            setRotation(rot);
          }
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Location access is not supported by this browser.");
    }
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
      {error ? <p>Error: {error}</p> : <p>Direction: {direction}</p>}
    </div>
  );
};

export default Direction;
