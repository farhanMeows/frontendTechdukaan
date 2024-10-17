import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";
import axios from "axios";

export default function PhonePeCheckout() {
  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    // Async function to handle payment request
    const initiatePayment = async () => {
      if (currentOrder && currentOrder.totalAmount && currentOrder.id) {
        console.log("Total Amount:", currentOrder.totalAmount);
        console.log("Order ID:", currentOrder.orderId);

        const data = {
          totalAmount: currentOrder.totalAmount,
          orderId: currentOrder.orderId,
          id: currentOrder.id,
        };

        try {
          const response = await axios.post(
            "https://techdukaan.vercel.app/create-payment-request",
            data
          );
          console.log(response.data);

          // Redirecting to PhonePe payment gateway
          window.location.href = response.data.url;
        } catch (error) {
          console.error("Error in initiating payment:", error.message || error);
        }
      }
    };

    // Call the async function
    initiatePayment();
  }, [currentOrder]);

  return (
    <div className="PhonePe">
      <h2>Redirecting to PhonePe payment gateway...</h2>
      <p>Creating payment request, please wait...</p>
    </div>
  );
}
