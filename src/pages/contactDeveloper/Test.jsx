import React, { useEffect, useState } from "react";

function Test() {
  const [count, setCount] = useState(5);
  const [countInterval, setCountInterval] = useState(null);

  useEffect(() => {
    if (countInterval) {
      clearInterval(countInterval);
    }
  }, [countInterval]);

  function startCounting() {
    console.log("clicked");
    if (!countInterval && count > 0) {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
      setCountInterval(interval);
    }
  }

  return (
    <div className="container-fluid">
      <h2>{count}</h2>
      <button onClick={startCounting}>Start</button>
    </div>
  );
}

export default Test;
