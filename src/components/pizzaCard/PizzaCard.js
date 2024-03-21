import React, { useState, useEffect } from "react";
import "./PizzaCard.css";

const PizzaCard = ({
  order,
  timeElapsed,
  handleCancelOrder,
  handleMoveToNextStage,
  handleMoveToPickedStage,
}) => {
  // Define delay state
  const [delay, setDelay] = useState(0);

  // Start the timer when the component mounts
  useEffect(() => {
    // Function to calculate delay based on order size
    const calculateDelay = () => {
      const makingTime =
        order.size === "Small" ? 180 : order.size === "Medium" ? 240 : 300; // 3, 4, 5 minutes in seconds
      const orderTime = new Date(order.time).getTime();
      const currentTime = new Date().getTime();
      const elapsedTime = (currentTime - orderTime) / 1000; // in seconds

      setDelay(elapsedTime - makingTime);
    };

    const interval = setInterval(() => {
      calculateDelay();
    }, 1000); // Update every second

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [order]); // Calculate delay when the order changes

  // Function to format delay time
  const formatDelayTime = (delayInSeconds) => {
    const minutes = Math.floor(delayInSeconds / 60);
    const seconds = Math.floor(delayInSeconds % 60);
    return `${minutes} min ${seconds} sec`;
  };

  // Setting Background Color based on delay and order stage
  let backgroundColor = "white"; // Default background color
  if (order.stage === "Order Placed" && delay > 0) {
    backgroundColor = "red"; // Order is delayed in "Order Placed" stage
  }

  return (
    <div className="pizza-card" style={{ backgroundColor }}>
      {/* Display pizza details */}
      <h3>{order.type} Pizza</h3>
      <p>Size: {order.size}</p>
      <p>Base: {order.base}</p>
      <p>Stage: {order.stage}</p>

      {(order.stage === "Order Placed" ||
        order.stage === "Order in Making" ||
        order.stage === "Order Ready") &&
        delay >
          (order.size === "Small"
            ? 180
            : order.size === "Medium"
            ? 240
            : 300) && <p>Delay: {formatDelayTime(delay)}</p>}

      {order.stage !== "Order Picked" && (
        <p>
          Time:{" "}
          {`${timeElapsed?.minutes || 0} min ${timeElapsed?.seconds || 0} sec`}
        </p>
      )}

      {/* Render action buttons based on the order stage */}
      {(order.stage === "Order Placed" ||
        order.stage === "Order in Making") && (
        <>
          <button onClick={handleCancelOrder}>Cancel</button>
          <button onClick={handleMoveToNextStage}>Next</button>
          <button onClick={handleMoveToPickedStage}>Picked</button>
        </>
      )}

      {order.stage === "Order Ready" && (
        <>
          <button onClick={handleMoveToPickedStage}>Next</button>
          <button onClick={handleMoveToPickedStage}>Picked</button>
        </>
      )}
      {order.stage === "Order Picked" && <span>Picked</span>}
    </div>
  );
};

export default PizzaCard;
