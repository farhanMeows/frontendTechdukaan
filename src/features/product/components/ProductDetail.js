import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectProductById,
  selectProductListStatus,
} from "../productSlice";
import { useParams } from "react-router-dom";
import { addToCartAsync, selectItems } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { useAlert } from "react-alert";
import { Grid } from "react-loader-spinner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const items = useSelector(selectItems);
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const status = useSelector(selectProductListStatus);

  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      console.log({ items, product });
      const newItem = {
        product: product.id,
        quantity: 1,
      };
      if (selectedColor) {
        newItem.color = selectedColor;
      }
      if (selectedSize) {
        newItem.size = selectedSize;
      }
      dispatch(addToCartAsync({ item: newItem, alert }));
    } else {
      alert.error("Item Already added");
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      {status === "loading" ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80">
          <Grid
            height="80"
            width="80"
            color="rgb(168, 85, 247)" // Futuristic accent color
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : null}

      {product && (
        <div className="pt-10 lg:pt-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="px-4 sm:px-6 lg:px-8">
            <ol className="mx-auto max-w-2xl lg:max-w-7xl flex items-center space-x-2 text-gray-400 text-sm">
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="text-indigo-400 hover:text-indigo-600 transition duration-300"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-4 text-gray-600"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-400 hover:text-indigo-600 transition duration-300"
                >
                  {product.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Single Image */}
          {/* Single Image */}
          <div className="mx-auto mt-6 px-4 sm:px-6 lg:px-8">
            <div className="absolute aspect-w-1 aspect-h-1  inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-900 opacity-0 hover:opacity-20 transition duration-300 ease-in-out" />
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-64 lg:h-80 xl:h-96 w-full object-contain object-center rounded-lg"
            />
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-12 pt-8 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-20 lg:pt-16">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-start">
              <div className="lg:pr-16">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-100 sm:text-4xl lg:text-5xl">
                  {product.title}
                </h1>
                <p className="mt-2 text-base text-indigo-400">
                  Category: {product.category}
                </p>

                {/* Pricing */}
                <div className="mt-6 flex items-center space-x-6">
                  <p className="text-2xl line-through text-gray-500">
                    ₹{product.price}
                  </p>
                  <p className="text-4xl font-semibold text-indigo-400">
                    ₹{product.discountPrice}
                  </p>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleCart}
                  className="mt-8 w-full lg:w-auto flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-transform transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>

              {/* Description */}
              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-semibold text-gray-100">
                  Description
                </h2>
                <p className="mt-4 text-base text-gray-300">
                  {product.description}
                </p>

                {/* Highlights */}
                {product.highlights && (
                  <div className="mt-10">
                    <h3 className="text-lg font-semibold text-gray-100">
                      Highlights
                    </h3>
                    <ul className="mt-4 list-disc space-y-2 pl-4 text-gray-300">
                      {product.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
