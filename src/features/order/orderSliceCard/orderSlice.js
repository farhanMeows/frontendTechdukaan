// orderDetailsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderDetailsSlice = createSlice({
  name: "orderDetails", // Updated slice name
  initialState: null, // or an empty object
  reducers: {
    setOrderDetails(state, action) {
      return action.payload; // Update the order details state
    },
    resetOrderDetails() {
      return null; // Reset to initial state
    },
  },
});

export const selectOrderDetails = (state) => state.orderDetails; // Adjust according to your store structure
// Export actions
export const { setOrderDetails, resetOrderDetails } = orderDetailsSlice.actions;

// Export the reducer
export default orderDetailsSlice.reducer;
