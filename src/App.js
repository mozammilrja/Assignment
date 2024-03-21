import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import OrderForm from "./components/orderForm/OrderForm";
import MainDisplay from "./components/mainDisplay/MainDisplay";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  // Create Redux persistor instance
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={<h1 className="Loading">Loading</h1>} persistor={persistor}>
        <div className="App">
          <h1 className="brand-name">PIZZA SHOP</h1>
          <OrderForm />
          <MainDisplay />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
