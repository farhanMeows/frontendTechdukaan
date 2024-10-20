import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  fetchBanner,
  selectLoading,
  selectError,
} from "../../product/components/bannerSlice"; // Update the import path if needed

const Banner = ({ productListRef }) => {
  const dispatch = useDispatch();
  const banner = useSelector((state) => state.banner.banners); // Now this is a single banner object
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Ensure the banner data exists and contains the necessary images
  const banners =
    banner && banner.image1
      ? [banner.image1, banner.image2, banner.image3]
      : [];

  useEffect(() => {
    dispatch(fetchBanner()); // Fetch banners from the API on component mount
  }, [dispatch]);

  useEffect(() => {
    // Auto-slide every 3 seconds (3000 milliseconds)
    if (banners.length > 0) {
      const autoSlide = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
      }, 3000);

      // Cleanup the interval when the component unmounts
      return () => clearInterval(autoSlide);
    }
  }, [banners.length]);

  // Loading or error handling
  if (loading) {
    return <p className="text-center"></p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  // Check if banners array is empty
  if (banners.length === 0) {
    return <p className="text-center">No banners available.</p>;
  }

  // Sliding logic: banners slide from the right and enter from the left
  const slideStyle = (index) => {
    if (index === currentSlide) {
      return "translate-x-0"; // The active slide stays in place
    }
    if (index > currentSlide) {
      return "translate-x-full"; // Future slides start from the right
    }
    return "-translate-x-full"; // Past slides move to the left
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? banners.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
  };

  return (
    <div className="relative w-full h-72 sm:h-[400px] overflow-hidden">
      {/* Banner Images */}
      {banners.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out transform ${slideStyle(
            index
          )}`}
        >
          <img
            src={image}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Previous Button */}
      <button
        onClick={handlePrevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 focus:outline-none transition-all duration-300 ease-in-out"
      >
        <FaArrowLeft size={20} />
      </button>

      {/* Next Button */}
      <button
        onClick={handleNextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 focus:outline-none transition-all duration-300 ease-in-out"
      >
        <FaArrowRight size={20} />
      </button>

      {/* Navigation Dots */}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
