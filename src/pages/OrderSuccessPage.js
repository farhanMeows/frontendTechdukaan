import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetOrder } from "../features/order/orderSlice";
import { useOrder } from "../features/order/OrderContext";
import { updateOrderAsync } from "../features/order/orderSlice";
import { selectOrderDetails } from "../features/order/orderSliceCard/orderSlice";
import { orderState } from "../features/atoms/orderAtoms";
import { useRecoilValue } from "recoil";

function OrderSuccessPage() {
  // const { order } = useOrder();
  const order = useRecoilValue(orderState); // Read the order state

  // const orderDetails = useSelector(selectOrderDetails); // Access the global order details
  const params = useParams(); //use params.id
  const dispatch = useDispatch();
  // const { order } = useOrder(); // Access the global order
  // const order = useSelector((state) => state.order);
  useEffect(() => {
    const updatedOrder = { ...order, paymentStatus: "Received" };
    dispatch(updateOrderAsync(updatedOrder));
    console.log(" order ", order);
    console.log("updated orderd ", updatedOrder);

    // Reset cart
    dispatch(resetCartAsync());
    // Reset current order
    dispatch(resetOrder());
  }, [dispatch, params.id]);

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            Order Successfully Placed
          </p>
          <h1 className="mt-4 text-lg font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Order Number #{params?.id}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg">
            You can check your order in My Account
          </p>
          <p className="mt-6 text-base leading-1 text-gray-600 sm:text-lg">
            My Orders
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-y-4 sm:flex-row sm:gap-x-6">
            <Link
              to="/"
              className="w-full sm:w-auto rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderSuccessPage;
