import { configureStore, createReducer } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import userReducer from "../features/user/userSlice";
import orderDetailsReducer from "../features/order/orderSliceCard/orderSlice";
import bannerReducer from "../features/product/components/bannerSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    orderDetails: orderDetailsReducer, // Add orderDetailsReducer here
    banner: bannerReducer,
  },
});
