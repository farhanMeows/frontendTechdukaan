import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBanner,
  updateBanner,
  selectBanner,
  selectLoading,
  selectError,
} from "../../product/components/bannerSlice"; // Update the import path if needed

const AddBanner = () => {
  const dispatch = useDispatch();
  const currentBanner = useSelector(selectBanner);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [images, setImages] = useState({
    image1: "",
    image2: "",
    image3: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);

  useEffect(() => {
    if (currentBanner) {
      setImages({
        image1: currentBanner.image1,
        image2: currentBanner.image2,
        image3: currentBanner.image3,
      });
    }
  }, [currentBanner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setImages((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(updateBanner(images));

    // Check if the action was fulfilled and set the success message
    if (updateBanner.fulfilled.match(resultAction)) {
      setSuccessMessage("Banner updated successfully!");
    } else {
      setSuccessMessage(""); // Clear success message on error
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Update Banner Images
      </h1>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-center">{successMessage}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {["image1", "image2", "image3"].map((imageKey) => (
          <div key={imageKey}>
            <label htmlFor={imageKey} className="block mb-2 font-medium">
              {`Image ${imageKey.charAt(imageKey.length - 1)} URL`}
            </label>
            <input
              type="text"
              name={imageKey}
              id={imageKey}
              value={images[imageKey]}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Update Banner
        </button>
      </form>
    </div>
  );
};

export default AddBanner;
