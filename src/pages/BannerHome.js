import React from "react";

function BannerHome() {
  return (
    <div className="relative w-full h-screen bg-gray-900">
      {/* Background image */}
      <div
        className="absolute inset-0 md:bg-cover bg-center opacity-70"
        style={{
          backgroundImage:
            'url("https://img.freepik.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg")',
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Banner content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6 md:px-12">
        <h1 className="text-red-600 text-5xl md:text-7xl font-bold mb-4">
          MANIPUR
        </h1>
        <h2 className="text-white text-xl md:text-3xl font-semibold mb-2">
          TECHDUKAAN X SKCC
        </h2>
        <hr className="border-red-600 w-1/2 mb-4" />
        <p className="text-white text-lg md:text-2xl mb-6">
          GET THE <span className="font-bold text-red-600">ULTIMATE POWER</span>{" "}
          IN YOUR HANDS
        </p>
        <p className="text-white text-lg md:text-2xl mb-6">
          AT A <span className="font-bold text-red-600">UNBEATABLE PRICE</span>{" "}
          TODAY
        </p>
        <a
          href="/"
          className="bg-white text-black font-bold px-8 py-3 rounded-md text-lg hover:bg-gray-200 transition duration-300"
        >
          Shop Now
        </a>

        {/* Contact Information */}
        <div className="absolute bottom-6 text-white text-sm md:text-lg flex flex-col items-center">
          <p className="mb-1">
            <i className="fas fa-phone-alt"></i> +91 - 87986 52990
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i> M.G. Avenue, Thangal
            Bazar, Imphal, Manipur
          </p>
        </div>
      </div>
    </div>
  );
}

export default BannerHome;
