import { createSlice } from "@reduxjs/toolkit";

// Define stages of the pizza order
const stages = [
  "Order Placed",
  "Order in Making",
  "Order Ready",
  "Order Picked",
];

// Initial state for the pizza slice
const initialState = {
  orders: [], // Array to store pizza orders
  totalPizzasDelivered: 0, // Counter for total pizzas delivered
  stages: stages, // Array of stages
};

// Create a slice for managing pizza orders
const pizzaSlice = createSlice({
  name: "pizza", // Slice name
  initialState, 
  reducers: {
    // Action to add a new pizza order
    addOrder: (state, action) => {
      state.orders.push(action.payload); // Add the new order to the orders array
    },
    // Action to cancel a pizza order
    cancelOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      ); // Remove the order with the specified ID from the orders array
    },
    // Action to move a pizza order to the next stage
    moveToNextStage: (state, action) => {
      const orderId = action.payload;
      const order = state.orders.find((order) => order.id === orderId); // Find the order with the specified ID
      if (order) {
        const currentStageIndex = stages.indexOf(order.stage); // Get the index of the current stage of the order
        if (currentStageIndex < stages.length - 1) {
          order.stage = stages[currentStageIndex + 1]; // Move the order to the next stage
        }
      }
    },
    // Action to move a pizza order to the "Order Picked" stage
    moveToPickedStage: (state, action) => {
      const orderId = action.payload;
      const order = state.orders.find((order) => order.id === orderId); // Find the order with the specified ID
      if (order && order.stage !== "Order Picked") {
        order.stage = "Order Picked"; // Move the order to the "Order Picked" stage
        state.totalPizzasDelivered++; // Increment the total pizzas delivered counter
      }
    },
  },
});

// Export action creators
export const { addOrder, cancelOrder, moveToNextStage, moveToPickedStage } =
  pizzaSlice.actions;

// Export the reducer function
export default pizzaSlice.reducer;
