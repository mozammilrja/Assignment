import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  cancelOrder,
  moveToNextStage,
  moveToPickedStage,
} from "../../redux/pizzaSlice";
import PizzaCard from "../pizzaCard/PizzaCard";
import "./MainDisplay.css";

const MainDisplay = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.pizza.orders || []); // Modified: Added default empty array as fallback
  const totalPizzasDelivered = useSelector(
    (state) => state.pizza.totalPizzasDelivered
  );

  // Function to cancel an order
  const handleCancelOrder = (id) => {
    dispatch(cancelOrder(id));
  };

  // Function to move an order to the next stage
  const handleMoveToNextStage = (id) => {
    dispatch(moveToNextStage(id));
  };

  // Function to move an order to the "Picked" stage
  const handleMoveToPickedStage = (id) => {
    dispatch(moveToPickedStage(id));
  };

  // Function to calculate the time difference between the current time and the order time
  const getTimeDifference = (order) => {
    const currentTime = new Date();
    const orderTime = new Date(order.time);
    const diffInSeconds = Math.floor((currentTime - orderTime) / 1000); // Difference in seconds
    const minutes = Math.floor(diffInSeconds / 60);
    const seconds = diffInSeconds % 60;
    return { minutes, seconds };
  };

  const [timeElapsed, setTimeElapsed] = useState({});

  // Update the time elapsed every second
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimeElapsed = {};
      orders.forEach((order) => {
        updatedTimeElapsed[order.id] = getTimeDifference(order);
      });
      setTimeElapsed(updatedTimeElapsed);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [orders]);

  return (
    <div className="main-display">
      <h2>Pizza Stages Section</h2>
      {orders && orders.length > 0 ? (
        <>
          <div className="stages-container">
            {[
              "Order Placed",
              "Order in Making",
              "Order Ready",
              "Order Picked",
            ].map((stage) => (
              <div
                key={stage}
                className={`${stage.toLowerCase().replace(" ", "-")} stage`}
              >
                <h3>{stage}</h3>
                {orders
                  ?.filter((order) => order.stage === stage) // Ensure orders is filtered based on stage
                  .map((order) => (
                    <PizzaCard
                      key={order.id}
                      order={order}
                      timeElapsed={timeElapsed[order.id]}
                      handleCancelOrder={() => handleCancelOrder(order.id)}
                      handleMoveToNextStage={() =>
                        handleMoveToNextStage(order.id)
                      }
                      handleMoveToPickedStage={() =>
                        handleMoveToPickedStage(order.id)
                      }
                    />
                  ))}
              </div>
            ))}
          </div>

          <div className="main-section">
            <h2>Main Section</h2>
            <table>
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Stage</th>
                  <th>Total time spent (time from order placed)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.stage}</td>
                    <td>{`${timeElapsed[order.id]?.minutes || 0} min ${
                      timeElapsed[order.id]?.seconds || 0
                    } sec`}</td>
                    <td>
                      {(order.stage === "Order Placed" ||
                        order.stage === "Order in Making") && (
                        <button onClick={() => handleCancelOrder(order.id)}>
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="yellow-background">
                  <td>Total order delivered</td>
                  <td colSpan="1">{totalPizzasDelivered}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h4>No orders available</h4>
      )}
    </div>
  );
};

export default MainDisplay;
