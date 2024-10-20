import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };
  const handleRemove = (e, index) => {
    e.preventDefault();

    // Remove the address from the array by filtering out the address at the index
    const updatedAddresses = userInfo.addresses.filter((_, i) => i !== index);

    // Create new user object with the updated addresses
    const updatedUser = {
      ...userInfo,
      addresses: updatedAddresses,
    };

    // Dispatch the updated user information to the store
    dispatch(updateUserAsync(updatedUser));
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
    setValue("phone", address.phone);
    setValue("street", address.street);
  };

  const handleAdd = (address) => {
    const newUser = {
      ...userInfo,
      addresses: [...userInfo.addresses, address],
    };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <div className="mx-auto mt-12 bg-gray-800 max-w-7xl p-8 rounded-lg shadow-lg">
        <h1 className="mx-auto text-start text-2xl font-bold text-indigo-500 py-10">
          My Profile
        </h1>
        <div className="border-t border-gray-700 py-6">
          <h3 className="text-xl my-5 font-semibold tracking-wide text-indigo-400">
            Email Address: {userInfo.email}
          </h3>
          {userInfo.role === "admin" && (
            <h3 className="text-xl my-5 font-semibold tracking-wide text-red-500">
              Role: {userInfo.role}
            </h3>
          )}
        </div>

        <div className="border-t border-gray-700 px-4 py-6">
          <button
            onClick={() => {
              setShowAddAddressForm(true);
              setSelectedEditIndex(-1);
            }}
            className="rounded-md bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          >
            Add New Address
          </button>

          {showAddAddressForm ? (
            <form
              className=" bg-gray-900 text-gray-100  px-5 py-12 mt-12"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                handleAdd(data);
                reset();
              })}
            >
              <div className="space-y-12">
                {/* form */}
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

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          ) : null}

          <p className="mt-2 text-sm text-gray-400">Your Addresses:</p>
          {userInfo.addresses.map((address, index) => (
            <div key={index} className="my-4">
              {selectedEditIndex === index ? (
                <form
                  className="bg-gray-800 p-6 rounded-md shadow-md"
                  onSubmit={handleSubmit((data) => {
                    handleEdit(data, index);
                    reset();
                  })}
                >
                  <h2 className="text-2xl font-semibold text-indigo-400">
                    Edit Address
                  </h2>

                  <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6 mt-6">
                    <div className="sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-300">
                        Full Name
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="mt-2 w-full rounded-md bg-gray-900 border border-gray-700 text-gray-300 p-2"
                      />
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        className="mt-2 w-full rounded-md bg-gray-900 border border-gray-700 text-gray-300 p-2"
                      />
                      {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-300">
                        Phone
                      </label>
                      <input
                        type="tel"
                        {...register("phone", {
                          required: "Phone is required",
                        })}
                        className="mt-2 w-full rounded-md bg-gray-900 border border-gray-700 text-gray-300 p-2"
                      />
                      {errors.phone && (
                        <p className="text-red-500">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="col-span-full">
                      <label className="block text-sm font-medium text-gray-300">
                        Street Address
                      </label>
                      <input
                        type="text"
                        {...register("street", {
                          required: "Street is required",
                        })}
                        className="mt-2 w-full rounded-md bg-gray-900 border border-gray-700 text-gray-300 p-2"
                      />
                      {errors.street && (
                        <p className="text-red-500">{errors.street.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-300">
                        City
                      </label>
                      <input
                        type="text"
                        {...register("city", { required: "City is required" })}
                        className="mt-2 w-full rounded-md bg-gray-900 border border-gray-700 text-gray-300 p-2"
                      />
                      {errors.city && (
                        <p className="text-red-500">{errors.city.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-300">
                        State
                      </label>
                      <input
                        type="text"
                        {...register("state", {
                          required: "State is required",
                        })}
                        className="mt-2 w-full rounded-md bg-gray-900 border border-gray-700 text-gray-300 p-2"
                      />
                      {errors.state && (
                        <p className="text-red-500">{errors.state.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-300">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        {...register("pinCode", {
                          required: "ZIP code is required",
                        })}
                        className="mt-2 w-full rounded-md bg-gray-900 border border-gray-700 text-gray-300 p-2"
                      />
                      {errors.pinCode && (
                        <p className="text-red-500">{errors.pinCode.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-4">
                    <button
                      onClick={() => setSelectedEditIndex(-1)}
                      className="px-4 py-2 text-sm font-semibold text-gray-400 bg-gray-700 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : null}

              <div className="flex justify-between items-center p-6 bg-gray-800 rounded-md shadow-md my-4">
                <div>
                  <p className="text-lg font-semibold text-indigo-400">
                    {address.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {address.street}, {address.pinCode}
                  </p>
                  <p className="text-sm text-gray-400">City: {address.city}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEditForm(index)}
                    className="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, index)}
                    className="text-sm font-semibold text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
