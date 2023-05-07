import React, { useState, useEffect } from "react";
import { getBearing } from "geolocation-utils";

const Direction = () => {
  const [direction, setDirection] = useState("");

  useEffect(() => {
    // Replace these coordinates with the coordinates of your starting and ending points
    const start = { lat: 37.7749, lon: -122.4194 };
    const end = { lat: 37.3352, lon: -121.8811 };

    const bearing = getBearing(start, end);
    let dir = "";
    if (bearing >= 337.5 || bearing < 22.5) {
      dir = "North";
    } else if (bearing >= 22.5 && bearing < 67.5) {
      dir = "Northeast";
    } else if (bearing >= 67.5 && bearing < 112.5) {
      dir = "East";
    } else if (bearing >= 112.5 && bearing < 157.5) {
      dir = "Southeast";
    } else if (bearing >= 157.5 && bearing < 202.5) {
      dir = "South";
    } else if (bearing >= 202.5 && bearing < 247.5) {
      dir = "Southwest";
    } else if (bearing >= 247.5 && bearing < 292.5) {
      dir = "West";
    } else {
      dir = "Northwest";
    }
    setDirection(dir);
  }, []);

  return (
    <div>
      <p>Direction: {direction}</p>
    </div>
  );
};

export default Direction;
