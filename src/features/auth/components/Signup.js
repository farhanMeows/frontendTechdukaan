import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { selectLoggedInUser, createUserAsync } from "../authSlice";
import { Link, Navigate } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center items-center bg-gray-900 py-12 px-6 lg:px-8">
        <div className="bg-gray-800 shadow-2xl rounded-lg p-8 max-w-md w-full">
          <div className="flex justify-center mb-8">
            <img
              className="h-12 w-auto"
              src="/ecommerce.png"
              alt="TechDukaan"
            />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-indigo-400">
            Join TechDukaan
          </h2>
          <p className="text-center text-sm text-indigo-300 mt-2">
            Create an account and start shopping today
          </p>

          <form
            noValidate
            className="space-y-6 mt-8"
            onSubmit={handleSubmit((data) => {
              dispatch(
                createUserAsync({
                  email: data.email,
                  password: data.password,
                  addresses: [],
                  role: "user",
                })
              );
              console.log(data);
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-indigo-300"
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
                  className="block w-full rounded-lg border border-gray-700 bg-gray-900 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-300 sm:text-sm"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-indigo-300"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters\n
                - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                - Can contain special characters`,
                    },
                  })}
                  type="password"
                  className="block w-full rounded-lg border border-gray-700 bg-gray-900 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-300 sm:text-sm"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-indigo-300"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value, formValues) =>
                      value === formValues.password || "Passwords do not match",
                  })}
                  type="password"
                  className="block w-full rounded-lg border border-gray-700 bg-gray-900 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-300 sm:text-sm"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-indigo-300">
            Already a member?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
