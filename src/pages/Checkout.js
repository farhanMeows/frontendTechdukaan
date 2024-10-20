import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../features/user/userSlice";
import { useState } from "react";
import {
  createOrderAsync,
  selectCurrentOrder,
  selectStatus,
} from "../features/order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";
import { Grid } from "react-loader-spinner";
import { useOrder } from "../features/order/OrderContext";
import { setOrderDetails } from "../features/order/orderSliceCard/orderSlice";
import { orderState } from "../features/atoms/orderAtoms";
import { useRecoilState } from "recoil";
import NavBar from "../features/navbar/Navbar";

function Checkout() {
  // const { setOrder } = useOrder();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  const status = useSelector(selectStatus);
  const currentOrder = useSelector(selectCurrentOrder);
  const [showAlert, setShowAlert] = useState(false);

  // const { setOrder } = useOrder();
  const [orderr, setOrderr] = useRecoilState(orderState); // Access the order atom

  const totalAmount = items.reduce(
    (amount, item) => item.product.discountPrice * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressClicked, setSelectedAddressClicked] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const handleAddress = (index) => {
    console.log(user.addresses[index]);
    setSelectedAddress(user.addresses[index]); // Set the selected address using the index
    setSelectedAddressClicked(index); // Track which address is clicked
  };

  const handlePayment = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  const handleOrder = (e) => {
    if (selectedAddress && paymentMethod) {
      const order = {
        items,
        totalAmount,
        totalItems,
        user: user.id,
        paymentMethod,
        selectedAddress,
        status: "pending", // other status can be delivered, received.
      };
      let storeOrder = order;
      // Dispatch the createOrderAsync action and wait for it to complete

      setOrderr(storeOrder);
      console.log("stored", orderr);

      dispatch(createOrderAsync(order)); // Create the order asynchronously
      // setOrder(order); // Set the order in global state
      // need to redirect from here to a new page of order success.
    } else {
      setShowAlert(true);
    }
  };
  // Function to close the alert modal
  const closeAlert = () => {
    setShowAlert(false);
  };
  const confirmAction = () => {
    // Logic for when the user clicks 'OK' (you can customize this)
    setShowAlert(false);
    console.log("Redirecting to address or payment page...");
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && currentOrder.paymentMethod === "cash" && (
        <Navigate
          to={`/order-success/${currentOrder.orderId}`}
          replace={true}
        ></Navigate>
      )}
      {currentOrder && currentOrder.paymentMethod === "card" && (
        <Navigate to={`/stripe-checkout/`} replace={true}></Navigate>
      )}
      <NavBar />
      {status === "loading" ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <Grid
            height="80"
            width="80"
            color="rgb(79, 70, 229)"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="mx-auto bg-gray-900 px-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            {/* //address form */}
            <div className="lg:col-span-3">
              {/* Address Form */}
              <form
                className="bg-gray-900 text-gray-100 px-5 py-12 mt-12 rounded-lg shadow-lg transition-transform hover:scale-[1.02]"
                noValidate
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                  dispatch(
                    updateUserAsync({
                      ...user,
                      addresses: [...user.addresses, data],
                    })
                  );
                  reset();
                })}
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-700 pb-12">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-100">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      Use a permanent address where you can receive mail.
                    </p>

                    {/* Grid for Form Fields */}
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-100"
                        >
                          Full name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "name is required",
                            })}
                            id="name"
                            className="block w-full rounded-lg bg-gray-800 border-0 py-2 text-gray-100 shadow-md ring-1 ring-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors.name && (
                            <p className="text-red-500 mt-1">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-100"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email is required",
                            })}
                            type="email"
                            className="block w-full rounded-lg bg-gray-800 border-0 py-2 text-gray-100 shadow-md ring-1 ring-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors.email && (
                            <p className="text-red-500 mt-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-100"
                        >
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            {...register("phone", {
                              required: "phone is required",
                            })}
                            type="tel"
                            className="block w-full rounded-lg bg-gray-800 border-0 py-2 text-gray-100 shadow-md ring-1 ring-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors.phone && (
                            <p className="text-red-500 mt-1">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6 text-gray-100"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "street is required",
                            })}
                            id="street"
                            className="block w-full rounded-lg bg-gray-800 border-0 py-2 text-gray-100 shadow-md ring-1 ring-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors.street && (
                            <p className="text-red-500 mt-1">
                              {errors.street.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Responsive Columns for City, State, and Postal Code */}
                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-100"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "city is required",
                            })}
                            id="city"
                            className="block w-full rounded-lg bg-gray-800 border-0 py-2 text-gray-100 shadow-md ring-1 ring-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors.city && (
                            <p className="text-red-500 mt-1">
                              {errors.city.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium leading-6 text-gray-100"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "state is required",
                            })}
                            id="state"
                            className="block w-full rounded-lg bg-gray-800 border-0 py-2 text-gray-100 shadow-md ring-1 ring-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors.state && (
                            <p className="text-red-500 mt-1">
                              {errors.state.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pinCode"
                          className="block text-sm font-medium leading-6 text-gray-100"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pinCode", {
                              required: "pinCode is required",
                            })}
                            id="pinCode"
                            className="block w-full rounded-lg bg-gray-800 border-0 py-2 text-gray-100 shadow-md ring-1 ring-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors.pinCode && (
                            <p className="text-red-500 mt-1">
                              {errors.pinCode.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      onClick={reset}
                      className="text-sm font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </form>

              {/* Addresses List */}
              <div className="border-b border-gray-700 pb-12 mt-12">
                <h2 className="text-base font-semibold leading-7 text-gray-100">
                  Addresses
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  Choose from Existing addresses
                </p>
                <ul className="space-y-4">
                  {user?.addresses?.map((address, index) => (
                    <li
                      key={index}
                      onClick={() => handleAddress(index)} // Call handleAddress with index directly
                      className={`flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-700 bg-gray-800 rounded-lg hover:scale-[1.02] transition-transform cursor-pointer ${
                        selectedAddressClicked === index
                          ? "border-indigo-600"
                          : ""
                      }`}
                    >
                      <div className="flex gap-x-4 w-full">
                        <input
                          name="address"
                          type="radio"
                          value={index}
                          checked={selectedAddressClicked === index} // Check if this address is selected
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          readOnly // Prevent manual change of radio input, only change via clicking the entire card
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-100">
                            {address.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                            {address.street}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                            {address.pinCode}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Method */}
              <div className="border-b border-gray-700 pb-12 mt-12">
                <fieldset>
                  <h2 className="text-2xl font-semibold leading-7 text-gray-100">
                    Payment Method
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Select your preferred payment method.
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center mb-4">
                      <input
                        id="cash" // Ensure this id matches the label
                        name="payments"
                        onChange={handlePayment}
                        value="cash"
                        type="radio"
                        checked={paymentMethod === "cash"}
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="cash" // Correctly reference the id of the input
                        className="ml-2 block text-sm leading-6 text-gray-100"
                      >
                        Cash On Delivery
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        id="card" // Ensure this id matches the label
                        onChange={handlePayment}
                        name="payments"
                        checked={paymentMethod === "card"}
                        value="card"
                        type="radio"
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="card" // Correctly reference the id of the input
                        className="ml-2 block text-sm leading-6 text-gray-100"
                      >
                        Pay Now
                      </label>
                    </div>
                    {errors.paymentMethod && (
                      <p className="text-red-500 mt-1">
                        {errors.paymentMethod.message}
                      </p>
                    )}
                  </div>
                </fieldset>
              </div>
            </div>
            {/* Cart */}
            <div className="lg:col-span-2">
              <div className="mx-auto mt-12 bg-gray-900 max-w-7xl px-2 sm:px-2 lg:px-4 shadow-lg rounded-lg">
                {/* Side cart */}
                <div className="border-t border-gray-800 px-0 py-6 sm:px-0">
                  <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-100">
                    Cart
                  </h1>
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-700">
                      {items.map((item) => (
                        <li
                          key={item.id}
                          className="flex py-6 hover:scale-[1.02] transition-transform"
                        >
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-indigo-400 shadow-lg">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-100">
                                <h3>
                                  <a
                                    href={item.product.id}
                                    className="hover:text-indigo-400 transition-colors"
                                  >
                                    {item.product.title}
                                  </a>
                                </h3>
                                <p className="ml-4">
                                  ₹{item.product.discountPrice}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-400">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm font-medium leading-6 text-gray-100"
                                >
                                  Qty
                                </label>
                                <select
                                  onChange={(e) => handleQuantity(e, item)}
                                  value={item.quantity}
                                  className="bg-gray-800 border-gray-600 text-gray-100"
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>

                              <div className="flex">
                                <button
                                  onClick={(e) => handleRemove(e, item.id)}
                                  type="button"
                                  className="font-medium text-indigo-400 hover:text-indigo-600 transition-colors"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-800 px-2 py-6 sm:px-2">
                  <div className="flex justify-between my-2 text-base font-medium text-gray-100">
                    <p>Subtotal</p>
                    <p>₹ {totalAmount}</p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-gray-100">
                    <p>Total Items in Cart</p>
                    <p>{totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-400">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <div
                      onClick={handleOrder}
                      className="flex cursor-pointer items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-indigo-700 transition-all"
                    >
                      Order Now
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <Link to="/">
                        <button
                          type="button"
                          className="font-medium text-indigo-400 hover:text-indigo-600 transition-colors"
                        >
                          Continue Shopping{" "}
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showAlert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="max-w-md p-6 bg-gray-800 rounded-lg shadow-lg transform transition-all duration-300 scale-105">
                <h2 className="text-2xl font-semibold text-gray-100">
                  Action Required
                </h2>
                <p className="mt-3 text-sm text-gray-400">
                  Please enter your address and payment method to proceed.
                </p>
                <div className="mt-5 flex justify-end space-x-4">
                  <button
                    onClick={closeAlert}
                    className="px-4 py-2 text-gray-300 bg-gray-700 rounded hover:bg-gray-600 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmAction}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition duration-200"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Checkout;
