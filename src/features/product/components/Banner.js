import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  fetchBanner,
  selectLoading,
  selectError,
} from "../../product/components/bannerSlice"; // Update the import path if needed

const Banner = () => {
  const dispatch = useDispatch();
  const banner = useSelector((state) => state.banner.banners); // Now this is a single banner object
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchBanner()); // Fetch banners from the API on component mount
  }, [dispatch]);

  // Loading or error handling
  if (loading) {
    return <p className="text-center"></p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  // Check if banner is available
  if (!banner || Object.keys(banner).length === 0) {
    return <p className="text-center"></p>;
  }

  // Array of banner images
  const banners = [banner.image1, banner.image2, banner.image3];

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? banners.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
  };

  return (
    <div className="relative w-full h-60 sm:h-96 overflow-hidden">
      {banners.map((image, index) => (
        <div
          key={index} // Use the index as a key, since the images don’t have unique ids
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image} // Use the appropriate image property
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Previous Button */}
      <button
        onClick={handlePrevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
      >
        <FaArrowLeft />
      </button>

      {/* Next Button */}
      <button
        onClick={handleNextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
      >
        <FaArrowRight />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index} // Use index as a unique key
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
