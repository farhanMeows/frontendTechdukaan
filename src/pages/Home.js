// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import NavBar from "../features/navbar/Navbar";
// import ProductList from "../features/product/components/ProductList";
// import Footer from "../features/common/Footer";
// import Banner from "../features/product/components/Banner";
// import {
//   isCategorySelectedAtom,
//   selectedCategoryAtom,
//   selectedCategoryIdAtom,
//   filterAtom,
// } from "../features/product/productAtoms/productAtoms";

// import {
//   fetchCategoriesAsync,
//   selectCategories,
// } from "../features/product/productSlice";
// import CategoriesBar from "../features/product/components/CategoriesBar";
// import { useRecoilState } from "recoil";

// function Home() {
//   const dispatch = useDispatch();
//   const categories = useSelector(selectCategories); // Fetch categories from Redux store
//   //   const [selectedCategory, setSelectedCategory] = useState(null);
//   //   const [id, setId] = useState(null);
//   // Use Recoil state for category selection
//   const [isCategorySelected, setIsCategorySelected] = useRecoilState(
//     isCategorySelectedAtom
//   );
//   const [selectedCategory, setSelectedCategory] =
//     useRecoilState(selectedCategoryAtom);
//   const [selectedCategoryId, setSelectedCategoryId] = useRecoilState(
//     selectedCategoryIdAtom
//   );

//   const [filter, setFilter] = useRecoilState(filterAtom);

//   useEffect(() => {
//     dispatch(fetchCategoriesAsync()); // Fetch categories on component mount
//   }, [dispatch]);

//   const handleCategoryFilter = (e, section, option) => {
//     const newFilter = { ...filter };
//     if (selectedCategory === option.value) {
//       setSelectedCategory(""); // Deselect if already selected
//       //   setId(null);
//       setIsCategorySelected("");
//       //   setSelectedCategoryId(null);
//       newFilter[selectedCategoryId] = []; // Clear the selected category

//       // Reset subcategories and brands when the category changes
//       newFilter["subcategory"] = [];
//       newFilter["brand"] = [];
//       newFilter["ram"] = [];
//       newFilter["processor"] = [];
//       newFilter["specification"] = [];
//     } else {
//       setSelectedCategory(option.value); // Set the selected category
//       // setId(option.id);
//       setSelectedCategoryId(option.id);
//       newFilter[selectedCategoryId] = [selectedCategory]; // Overwrite the category array with the selected option
//       //   console.log(id);
//       newFilter[section.id] = newFilter[section.id] || [];
//       newFilter[section.id].push(option.value);
//       setFilter(newFilter);
//     }
//   };

//   return (
//     <div>
//       <NavBar>
//         <CategoriesBar
//           categories={categories}
//           selectedCategory={selectedCategory}
//           categoryId={selectedCategoryId}
//           handleFilter={handleCategoryFilter}
//         />
//         <Banner />
//         <ProductList selectedCategory={selectedCategory} />
//       </NavBar>
//       <Footer />
//     </div>
//   );
// }

// export default Home;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from "../features/common/Footer";
import Banner from "../features/product/components/Banner";
import CategoriesBar from "../features/product/components/CategoriesBar";
import {
  fetchCategoriesAsync,
  selectCategories,
} from "../features/product/productSlice";
import { useRecoilState } from "recoil";
import {
  isCategorySelectedAtom,
  selectedCategoryAtom,
  selectedCategoryIdAtom,
  filterAtom,
} from "../features/product/productAtoms/productAtoms";

function Home() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  // Recoil state management for category selection
  const [isCategorySelected, setIsCategorySelected] = useRecoilState(
    isCategorySelectedAtom
  );
  const [selectedCategory, setSelectedCategory] =
    useRecoilState(selectedCategoryAtom);
  const [selectedCategoryId, setSelectedCategoryId] = useRecoilState(
    selectedCategoryIdAtom
  );
  const [filter, setFilter] = useRecoilState(filterAtom);

  useEffect(() => {
    dispatch(fetchCategoriesAsync()); // Fetch categories on component mount
  }, [dispatch]);

  const handleCategoryFilter = (e, section, option) => {
    const newFilter = { ...filter };

    if (selectedCategory === option.value) {
      // Deselect the category
      setSelectedCategory("");
      setSelectedCategoryId(null);
      setIsCategorySelected(false);
      newFilter["category"] = []; // Clear category filter

      // Reset related filters
      newFilter["subcategory"] = [];
      newFilter["brand"] = [];
      newFilter["ram"] = [];
      newFilter["processor"] = [];
      newFilter["specification"] = [];
    } else {
      // Select a new category
      setSelectedCategory(option.value);
      setSelectedCategoryId(option.id);
      setIsCategorySelected(true);
      newFilter["category"] = [option.value];

      // Clear other related filters when category changes
      newFilter["subcategory"] = [];
      newFilter["brand"] = [];
      newFilter["ram"] = [];
      newFilter["processor"] = [];
      newFilter["specification"] = [];
    }

    setFilter(newFilter);
  };

  return (
    <div>
      <NavBar>
        <CategoriesBar
          categories={categories}
          selectedCategory={selectedCategory}
          categoryId={selectedCategoryId}
          handleFilter={handleCategoryFilter}
        />
        <Banner />
        <ProductList selectedCategory={selectedCategory} />
      </NavBar>
      <Footer />
    </div>
  );
}

export default Home;
