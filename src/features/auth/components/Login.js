import { useSelector, useDispatch } from "react-redux";
import { selectError, selectLoggedInUser } from "../authSlice";
import { Link, Navigate } from "react-router-dom";
import { loginUserAsync } from "../authSlice";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError); // Redux error from login attempt
  const user = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [unauthorizedError, setUnauthorizedError] = useState(false);

  // Track Unauthorized errors only
  useEffect(() => {
    if (error === "Unauthorized") {
      // Assuming the error message from the backend is "Unauthorized"
      setUnauthorizedError(true);
      const timer = setTimeout(() => setUnauthorizedError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center items-center bg-gray-50 py-12 px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <div className="flex justify-center mb-8">
            <img
              className="h-12 w-auto"
              src="/ecommerce.png"
              alt="TechDukaan"
            />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Welcome back to TechDukaan
          </h2>
          <p className="text-center text-sm text-gray-600 mt-2">
            Log in to your account to access our services
          </p>

          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
                loginUserAsync({ email: data.email, password: data.password })
              );
            })}
            className="space-y-6 mt-8"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "Email not valid",
                    },
                  })}
                  type="email"
                  className="block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  className="block w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {unauthorizedError && (
                <p className="mt-2 text-sm text-red-600">
                  Incorrect password. Please try again.
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
