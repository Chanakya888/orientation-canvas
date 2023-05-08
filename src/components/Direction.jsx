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

            let dir = "";
            let rot = 0;
            if (alpha >= 315 || alpha < 45) {
              dir = "North";
              rot = 0;
            } else if (alpha >= 45 && alpha < 135) {
              dir = "East";
              rot = 90;
            } else if (alpha >= 135 && alpha < 225) {
              dir = "South";
              rot = 180;
            } else if (alpha >= 225 && alpha < 315) {
              dir = "West";
              rot = -90;
            }

            setTimeout(() => {
              setDirection(dir);
              setRotation(rot);
            }, 100);
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
        // style={{ transform: `rotate(${90 + rotation}deg)` }}
        style={{
          transform: `rotate(${90 + rotation}deg)`,
          transition: "transform 0.5s ease",
        }}
      />
      {error ? <p>Error: {error}</p> : <p>Direction: {direction}</p>}
    </div>
  );
};

export default Direction;
