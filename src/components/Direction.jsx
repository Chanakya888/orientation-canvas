import React, { useState, useEffect } from "react";

const Direction = () => {
  const [alpha, setAlpha] = useState(0);
  const [beta, setBeta] = useState(0);
  const [gamma, setGamma] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const { state } = await navigator.permissions.query({
          name: "accelerometer",
        });
        if (state === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
        } else {
          throw new Error("Permission denied");
        }
      } catch (err) {
        setError(err.message);
      }
    };
    requestPermission();
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const handleOrientation = (event) => {
    const { alpha, beta, gamma } = event;
    setAlpha(alpha);
    setBeta(beta);
    setGamma(gamma);
  };

  return (
    <div>
      <h1>Orientation Example</h1>
      <p>Alpha: {alpha.toFixed(2)}</p>
      <p>Beta: {beta.toFixed(2)}</p>
      <p>Gamma: {gamma.toFixed(2)}</p>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Direction;
