import React from "react";

const CategoriesBar = ({ categories, selectedCategory, handleFilter }) => {
  return (
    <div className="flex overflow-x-auto bg-gray-100 p-4">
      {categories.map((category) => (
        <button
          key={category.value}
          className={`px-4 py-2 mx-2 border rounded-full ${
            selectedCategory === category.value
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-800 border-gray-300"
          }`}
          onClick={() =>
            handleFilter(
              { target: { checked: true } },
              { id: "category" },
              category
            )
          }
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoriesBar;
