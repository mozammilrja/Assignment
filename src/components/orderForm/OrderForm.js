import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../redux/pizzaSlice";
import "./OrderForm.css";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    type: "",
    size: "",
    base: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.pizza.orders);

  const generateId = () => {
    return Math.floor(Math.random() * 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (orders.length < 10) {
      setIsLoading(true);
      const newOrder = {
        ...formData,
        stage: "Order Placed",
        time: new Date(),
        id: generateId(),
      };
      await dispatch(addOrder(newOrder));
      setFormData({ type: "", size: "", base: "" });
      setIsLoading(false);
    } else {
      alert("Sorry, we are not taking any more orders at the moment.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return formData.type && formData.size && formData.base; // Check if all options are selected
  };

  return (
    <div className="order-form-container">
      <div className="order-form">
        <h2>Place Your Order</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Type:
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </label>
          <label>
            Size:
            <select name="size" value={formData.size} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </label>
          <label>
            Base:
            <select name="base" value={formData.base} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Thin">Thin</option>
              <option value="Thick">Thick</option>
            </select>
          </label>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <button type="submit" disabled={!isFormValid()}>
              Place Order
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
