import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserInfoStatus,
  selectUserOrders,
} from "../userSlice";
import { Grid } from "react-loader-spinner";

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserInfoStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync());
  }, [dispatch]);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-indigo-400 mx-auto ml-4 tracking-wide py-4">
          My Orders
        </h1>
        {orders &&
          orders.map((order) => (
            <div
              key={order.id}
              className="mt-12 bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform "
            >
              <div className="border-t border-gray-700 px-4 py-6 sm:px-6">
                <h1 className="text-lg font-bold tracking-tight text-indigo-400 mb-3">
                  Order # {order.orderId}
                </h1>
                <h3 className="text-xl font-bold tracking-tight text-red-500 mb-5">
                  Order Status: {order.status}
                </h3>

                <ul className="-my-6 divide-y divide-gray-700">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md ">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-contain object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <h3 className="text-indigo-300 hover:underline">
                            <a href={`/product-detail/${item.product.id}`}>
                              {item.product.title}
                            </a>
                          </h3>
                          <p className="text-indigo-200 font-semibold">
                            ₹{item.product.discountPrice}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                        <div className="flex justify-between mt-4">
                          <p className="text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-700 py-6 mt-6">
                  <div className="flex justify-between text-indigo-200 text-base">
                    <p>Subtotal</p>
                    <p>₹ {order.totalAmount}</p>
                  </div>
                  <div className="flex justify-between text-indigo-200 text-base mt-2">
                    <p>Total Items</p>
                    <p>{order.totalItems} items</p>
                  </div>
                  <div className="mt-4 text-sm text-indigo-300">
                    Shipping Address:
                  </div>
                  <div className="flex flex-col gap-2 mt-2 p-4 bg-gray-700 rounded-lg">
                    <p className="font-medium">{order.selectedAddress.name}</p>
                    <p>{order.selectedAddress.street}</p>
                    <p>{order.selectedAddress.pinCode}</p>
                    <p>Phone: {order.selectedAddress.phone}</p>
                    <p>{order.selectedAddress.city}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {status === "loading" && (
          <div className="fixed inset-0 flex items-center justify-center">
            <Grid
              height="80"
              width="80"
              color="rgb(168, 85, 247)" // Matches futuristic accent
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
