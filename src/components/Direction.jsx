import React, { useState, useEffect } from "react";

const Direction = () => {
  const [direction, setDirection] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          window.addEventListener("deviceorientation", handleOrientation);

          function handleOrientation(event) {
            const alpha = event.alpha;

            let dir = "";
            if (alpha >= 337.5 || alpha < 22.5) {
              dir = "North";
            } else if (alpha >= 22.5 && alpha < 67.5) {
              dir = "Northeast";
            } else if (alpha >= 67.5 && alpha < 112.5) {
              dir = "East";
            } else if (alpha >= 112.5 && alpha < 157.5) {
              dir = "Southeast";
            } else if (alpha >= 157.5 && alpha < 202.5) {
              dir = "South";
            } else if (alpha >= 202.5 && alpha < 247.5) {
              dir = "Southwest";
            } else if (alpha >= 247.5 && alpha < 292.5) {
              dir = "West";
            } else {
              dir = "Northwest";
            }
            setDirection(dir);
          }
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>{error ? <p>Error: {error}</p> : <p>Direction: {direction}</p>}</div>
  );
};

export default Direction;
