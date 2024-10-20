import React, { useEffect, useRef } from "react";
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
  isCustomBuiltAtom,
} from "../features/product/productAtoms/productAtoms";

function Home() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  // Ref for scrolling to ProductList
  const productListRef = useRef(null);
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
  const [isCustomBuilt, setIsCustomBuilt] = useRecoilState(isCustomBuiltAtom);

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
      newFilter["colour"] = [];
      newFilter["graphic"] = [];
      newFilter["inkandcartridges"] = [];
      newFilter["size"] = [];
      newFilter["storage"] = [];
      newFilter["type"] = [];
      setIsCustomBuilt(false);
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
      newFilter["colour"] = [];
      newFilter["graphic"] = [];
      newFilter["inkandcartridges"] = [];
      newFilter["size"] = [];
      newFilter["storage"] = [];
      newFilter["type"] = [];
      setIsCustomBuilt(false);
      // Scroll to the ProductList section
      if (productListRef.current) {
        const offset = -40; // Adjust this value as needed to scroll above the ref
        const topPosition =
          productListRef.current.getBoundingClientRect().top +
          window.scrollY +
          offset;

        window.scrollTo({
          top: topPosition,
          behavior: "smooth",
        });
      }
    }

    setFilter(newFilter);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <NavBar />
      <CategoriesBar
        categories={categories}
        selectedCategory={selectedCategory}
        categoryId={selectedCategoryId}
        handleFilter={handleCategoryFilter}
      />
      <Banner productListRef={productListRef} />
      <div ref={productListRef} className="flex-grow">
        <ProductList selectedCategory={selectedCategory} />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
