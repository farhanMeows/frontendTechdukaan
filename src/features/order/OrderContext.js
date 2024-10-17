// OrderContext.js
import React, { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(null); // Initially set to null or an empty object

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use the Order context
export const useOrder = () => {
  return useContext(OrderContext);
};
