import React, { useState, useEffect } from "react";
import ArrowSvg from "../assets/arrow.svg";

const Direction = () => {
  const [error, setError] = useState(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          window.addEventListener("deviceorientation", handleOrientation);

          function handleOrientation(event) {
            const alpha = event.alpha;

            if (alpha !== null) {
              const rotation = Math.round(alpha);
              setRotation(rotation);
            }
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
      <h1>{rotation.toFixed(2)}</h1>

      <h2>{error}</h2>
    </div>
  );
};

export default Direction;
