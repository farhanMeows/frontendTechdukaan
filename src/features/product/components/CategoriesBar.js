import React from "react";

const CategoriesBar = ({ categories, selectedCategory, handleFilter }) => {
  return (
    <div className="flex overflow-x-auto overflow-y-hidden bg-gradient-to-r justify-center from-blue-500 via-purple-600 to-indigo-600 p-4 sticky top-0 z-10 shadow-lg space-x-2">
      <div className="flex space-x-4 min-w-full sm:min-w-min">
        {categories.map((category) => (
          <button
            key={category.value}
            className={`px-4 py-2 min-w-[120px] max-w-full border-2 rounded-full transition-transform duration-300 ease-out whitespace-nowrap ${
              selectedCategory === category.value
                ? "bg-white text-indigo-600 border-indigo-600 scale-105 shadow-md"
                : "bg-transparent text-white border-white md:hover:bg-white md:hover:text-indigo-600 hover:scale-105 hover:shadow-lg"
            } active:scale-95`} // Click effect
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
    </div>
  );
};

export default CategoriesBar;
