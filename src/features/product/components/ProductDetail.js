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
    <div className="bg-white">
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
      ) : null}

      {product && (
        <div className="pt-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
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
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Single Image */}
          <div className="mx-auto mt-6 px-4 max-w-full sm:px-6 lg:px-8">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-white max-w-sm lg:aspect-w-3 mx-auto">
              <img
                src={product.thumbnail} // Only display the first image
                alt={product.title}
                className="h-full w-full object-fill object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Category: {product.category}
              </p>
            </div>

            {/* Pricing */}
            <div className="mt-4">
              <p className="text-xl line-through tracking-tight text-gray-500">
                ₹{product.price}
              </p>
              <p className="text-3xl font-semibold tracking-tight text-gray-900">
                ₹{product.discountPrice}
              </p>
            </div>

            {/* Reviews */}
            {/* <div className="mt-4">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      product.rating > rating
                        ? "text-yellow-500"
                        : "text-gray-200",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
                <p className="ml-2 text-sm text-gray-600">
                  {product.rating} out of 5 stars
                </p>
              </div>
            </div> */}

            {/* Add to Cart */}
            <button
              onClick={handleCart}
              type="submit"
              className="mt-6 w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>

            {/* Description */}
            <div className="mt-10">
              <h2 className="text-lg font-medium text-gray-900">Description</h2>
              <p className="mt-4 text-base text-gray-700">
                {product.description}
              </p>
            </div>

            {/* Highlights */}
            {product.highlights && (
              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">
                  Highlights
                </h3>
                <ul className="mt-4 list-disc space-y-2 pl-4 text-gray-700">
                  {product.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
