import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBrandsAsync,
  fetchColoursAsync,
  fetchGraphicsAsync,
  fetchInkandcartridgesAsync,
  fetchSizeAsync,
  fetchStoragesAsync,
  fetchTypesAsync,
  fetchRamsAsync,
  fetchProcessorsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  fetchSpecificationsAsync,
  fetchSubcategoriesAsync, // Add import for fetching subcategories
  selectAllProducts,
  selectBrands,
  selectRams,
  selectProcessors,
  selectCategories,
  selectProductListStatus,
  selectTotalItems,
} from "../productSlice";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import Pagination from "../../common/Pagination";
import { Grid } from "react-loader-spinner";
import { fetchSpecifications } from "../productAPI";
import {
  selectedCategoryAtom,
  selectedCategoryIdAtom,
  isCategorySelectedAtom,
  filterAtom,
  isCustomBuiltAtom,
  isCustomBuiltLoadinAtom,
} from "../productAtoms/productAtoms";
import { useRecoilState } from "recoil";

const sortOptions = [
  {
    name: "Price: Low to High",
    sort: "discountPrice",
    order: "asc",
    current: false,
  },
  {
    name: "Price: High to Low",
    sort: "discountPrice",
    order: "desc",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  // const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const totalItems = useSelector(selectTotalItems);
  const status = useSelector(selectProductListStatus);

  const [filter, setFilter] = useRecoilState(filterAtom);
  const [sort, setSort] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colours, setColours] = useState([]);
  const [graphics, setGraphics] = useState([]);
  const [inkandcartridges, setInkandcartridges] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [storages, setStorages] = useState([]);
  const [types, setTypes] = useState([]);
  const [rams, setRams] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [isCustomBuilt, setIsCustomBuilt] = useRecoilState(isCustomBuiltAtom);
  const [isCategorySelected, setIsCategorySelected] = useRecoilState(
    isCategorySelectedAtom
  );
  const [selectedCategory, setSelectedCategory] =
    useRecoilState(selectedCategoryAtom);
  const [selectedCategoryId, setSelectedCategoryId] = useRecoilState(
    selectedCategoryIdAtom
  );
  const [isCustomBuiltLoadin, setIsCustomBuiltLoadin] = useRecoilState(
    isCustomBuiltLoadinAtom
  );

  const filters = [
    {
      id: "subcategory",
      name: "Subcategory",
      options: subcategories,
    },
    {
      id: "type",
      name: "Type",
      options: types,
    },
    {
      id: "brand",
      name: "Brand",
      options: brands,
    },
    {
      id: "ram",
      name: "Ram",
      options: rams,
    },
    {
      id: "processor",
      name: "Processor",
      options: processors,
    },
    {
      id: "colour",
      name: "Colour",
      options: colours,
    },
    {
      id: "graphic",
      name: "Graphic",
      options: graphics,
    },
    {
      id: "inkandcartridges",
      name: "Inkandcartridges",
      options: inkandcartridges,
    },
    {
      id: "size",
      name: "Size",
      options: sizes,
    },
    {
      id: "storage",
      name: "Storage",
      options: storages,
    },
  ];
  const handleFilter = (e, section, option) => {
    // Create a new filter object immutably
    const newFilter = { ...filter };

    // Handle subcategory filter
    if (section.id === "subcategory") {
      console.log(option.value);
      if (option.value === "Custom Build") {
        if (isCustomBuilt) {
          // Deselect "Custom Built"
          setIsCustomBuilt(false);
          console.log("Deselected Custom Built");
        } else {
          // Select "Custom Built"
          setIsCustomBuilt(true);
          console.log("Selected Custom Built");
        }
      } else {
        setIsCustomBuilt(false);

        // Remove "Custom Built" if it's in the newFilter
        if (newFilter[section.id]?.includes("Custom Built")) {
          newFilter[section.id] = newFilter[section.id].filter(
            (item) => item !== "Custom Built"
          );
        }

        if (e.target.checked) {
          // Add the subcategory if checked immutably
          newFilter[section.id] = [
            ...(newFilter[section.id] || []),
            option.value,
          ];
        } else {
          // Remove the subcategory if unchecked immutably
          newFilter[section.id] = newFilter[section.id].filter(
            (value) => value !== option.value
          );
        }

        // Uncheck the "Custom Built" checkbox if it exists
        const customBuiltCheckbox = document.querySelector(
          `input[value="Custom Built"]`
        );
        if (customBuiltCheckbox) {
          customBuiltCheckbox.checked = false;
        }
      }
    }

    // Handle brand filter
    else if (section.id === "brand") {
      setIsCustomBuilt(false);
      if (e.target.checked) {
        // Add the brand if checked immutably
        newFilter[section.id] = [
          ...(newFilter[section.id] || []),
          option.value,
        ];
      } else {
        // Remove the brand if unchecked immutably
        newFilter[section.id] = newFilter[section.id].filter(
          (value) => value !== option.value
        );
      }
    }

    // Handle other filters (ram, processor, etc.)
    // Handle ram, processor, and specification filters
    else if (
      [
        "ram",
        "processor",
        "specification",
        "colour",
        "graphic",
        "inkandcartridges",
        "size",
        "storage",
        "type",
      ].includes(section.id)
    ) {
      setIsCustomBuilt(false);
      // Ensure the array for the filter is initialized
      newFilter[section.id] = newFilter[section.id] || [];

      if (e.target.checked) {
        // Add the filter value if checked
        newFilter[section.id] = [...newFilter[section.id], option.value];
      } else {
        // Remove the filter value if unchecked
        newFilter[section.id] = newFilter[section.id].filter(
          (value) => value !== option.value
        );
      }
    }
    // Update the filter state immutably
    setFilter(newFilter);
  };

  const fetchSubcategories = async (categoryId) => {
    const response = await dispatch(fetchSubcategoriesAsync(categoryId));
    if (response.meta.requestStatus === "fulfilled") {
      const fetchedSubcategories = response.payload; // Get the payload from the response
      // console.log("Fetched subcategories:", fetchedSubcategories); // Log the response

      // Check if the fetched data is an array before setting it
      if (Array.isArray(fetchedSubcategories)) {
        setSubcategories(fetchedSubcategories);
      } else {
        console.error("Expected an array but got:", fetchedSubcategories);
        setSubcategories([]); // Reset to an empty array if the response is not valid
      }
    }
  };
  const fetchBrands = async (categoryId) => {
    const response = await dispatch(fetchBrandsAsync(categoryId)); // Fix here
    if (response.meta.requestStatus === "fulfilled") {
      const fetchedBrands = response.payload;

      if (Array.isArray(fetchedBrands)) {
        setBrands(fetchedBrands);
      } else {
        console.error("Expected an array but got:", fetchedBrands);
        setBrands([]);
      }
    }
  };
  const fetchColours = async (categoryId) => {
    const response = await dispatch(fetchColoursAsync(categoryId)); // Fix here
    if (response.meta.requestStatus === "fulfilled") {
      const fetchedColours = response.payload;
      console.log("colors", fetchedColours);

      if (Array.isArray(fetchedColours)) {
        setColours(fetchedColours);
        console.log("colors", colours);
      } else {
        console.error("Expected an array but got:", fetchedColours);
        setColours([]);
      }
    }
  };
  const fetchGraphics = async (categoryId) => {
    const response = await dispatch(fetchGraphicsAsync(categoryId)); // Fix here
    if (response.meta.requestStatus === "fulfilled") {
      const fetchedGraphics = response.payload;

      if (Array.isArray(fetchedGraphics)) {
        setGraphics(fetchedGraphics);
      } else {
        console.error("Expected an array but got:", fetchedGraphics);
        setGraphics([]);
      }
    }
  };
  const fetchInkandcartridges = async (categoryId) => {
    const response = await dispatch(fetchInkandcartridgesAsync(categoryId)); // Fix here
    if (response.meta.requestStatus === "fulfilled") {
      const fetchedInkandcartridges = response.payload;

      if (Array.isArray(fetchedInkandcartridges)) {
        setInkandcartridges(fetchedInkandcartridges);
      } else {
        console.error("Expected an array but got:", fetchedInkandcartridges);
        setInkandcartridges([]);
      }
    }
  };
  const fetchSize = async (categoryId) => {
    const response = await dispatch(fetchSizeAsync(categoryId)); // Fix here
    if (response.meta.requestStatus === "fulfilled") {
      const fetchedSize = response.payload;

      if (Array.isArray(fetchedSize)) {
        setSizes(fetchedSize);
      } else {
        console.error("Expected an array but got:", fetchedSize);
        setSizes([]);
      }
    }
  };

  const fetchStorages = async (categoryId) => {
    const response = await dispatch(fetchStoragesAsync(categoryId)); // Fix here
    if (response.meta.requestStatus === "fulfilled") {
      const fetchedStorages = response.payload;

      if (Array.isArray(fetchedStorages)) {
        setStorages(fetchedStorages);
      } else {
        console.error("Expected an array but got:", fetchedStorages);
        setStorages([]);
      }
    }
  };
  const fetchTypes = async (categoryId) => {
    const response = await dispatch(fetchTypesAsync(categoryId)); // Fix here
    if (response.meta.requestStatus === "fulfilled") {
      const fetchedTypes = response.payload;

      if (Array.isArray(fetchedTypes)) {
        setTypes(fetchedTypes);
      } else {
        console.error("Expected an array but got:", fetchedTypes);
        setTypes([]);
      }
    }
  };
  const fetchRams = async (categoryId) => {
    const response = await dispatch(fetchRamsAsync(categoryId)); // Fix here
    if (response.meta.requestStatus === "fulfilled") {
      const fetchedRams = response.payload;

      if (Array.isArray(fetchedRams)) {
        setRams(fetchedRams);
      } else {
        console.error("Expected an array but got:", fetchedRams);
        setRams([]);
      }
    }
  };

  const fetchProcessors = async (categoryId) => {
    const response = await dispatch(fetchProcessorsAsync(categoryId)); // Fix here
    if (response.meta.requestStatus === "fulfilled") {
      const fetchedProcessors = response.payload;

      if (Array.isArray(fetchedProcessors)) {
        setProcessors(fetchedProcessors);
      } else {
        console.error("Expected an array but got:", fetchedProcessors);
        setProcessors([]);
      }
    }
  };
  const fetchSpecifications = async (categoryId) => {
    const response = await dispatch(fetchSpecificationsAsync(categoryId)); // Fix here
    if (response.meta.requestStatus === "fulfilled") {
      const fetchedSpecifications = response.payload;

      if (Array.isArray(fetchedSpecifications)) {
        setSpecifications(fetchedSpecifications);
      } else {
        console.error("Expected an array but got:", fetchedSpecifications);
        setSpecifications([]);
      }
    }
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    console.log({ sort });
    setSort(sort);
  };

  const handlePage = (page) => {
    console.log({ page });
    setPage(page);
  };

  useEffect(() => {
    fetchSubcategories(selectedCategoryId);
    fetchBrands(selectedCategoryId);
    fetchRams(selectedCategoryId);
    fetchProcessors(selectedCategoryId);
    fetchColours(selectedCategoryId);
    fetchGraphics(selectedCategoryId);
    fetchInkandcartridges(selectedCategoryId);
    fetchSize(selectedCategoryId);
    fetchStorages(selectedCategoryId);
    fetchTypes(selectedCategoryId);
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };

    // Check if any filters are applied by checking the filter values
    const isFilterApplied = Object.values(filter).some((f) => f.length > 0);

    if (!isFilterApplied) {
      // No filters applied, fetch all products
      dispatch(fetchProductsByFiltersAsync({ sort, pagination }));
    } else {
      // Fetch products based on the applied filters
      dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
    }
    console.log("filter", filter);
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);

  return (
    <div className="bg-gray-900">
      <div>
        <MobileFilter
          handleFilter={handleFilter}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-700 pb-6 pt-10">
            <h1 className="text-4xl font-bold tracking-tight text-indigo-400">
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative z-10 inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-400 hover:text-indigo-400">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-60 mt-2 w-40 origin-top-right rounded-md bg-gray-800 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={(e) => handleSort(e, option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-indigo-400"
                                  : "text-gray-300",
                                active ? "bg-gray-700" : "",
                                "block px-4 py-2 text-sm transition"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {isCategorySelected && (
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-indigo-400 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <DesktopFilter
                handleFilter={handleFilter}
                filters={filters}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                filter={filter}
              />
              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductGrid
                  products={products}
                  status={status}
                  isCustomBuilt={isCustomBuilt}
                />
              </div>
              {/* Product grid end */}
            </div>
          </section>

          {/* section of product and filters ends */}
          <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
            totalItems={totalItems}
          />
        </main>
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
  selectedCategory,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50" // Change z-60 to z-50 for consistent layering
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-[15rem] flex-col overflow-y-auto bg-gray-900 py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-indigo-400">Filters</h2>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-700">
                {filters
                  .filter(
                    (section) => section.options && section.options.length > 0
                  )
                  .map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      defaultOpen={
                        section.id === "subcategory" ||
                        section.id === "type" ||
                        section.id === "brand"
                      }
                      className="border-t border-gray-700 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-gray-800 px-2 py-3 rounded-lg text-indigo-400 hover:bg-gray-700 transition">
                              <span className="font-medium">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-4">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    value={option.value}
                                    type="checkbox"
                                    checked={
                                      section.id === "category"
                                        ? selectedCategory === option.value
                                        : option.checked
                                    }
                                    onChange={(e) =>
                                      handleFilter(e, section, option)
                                    }
                                    className="h-4 w-4 rounded border-gray-600 text-indigo-500 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-300"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function DesktopFilter({
  handleFilter,
  filters,
  selectedCategory,
  subcategories,
  setSelectedCategory,
  filter,
}) {
  return (
    <form className="hidden lg:block bg-gray-900 p-6 rounded-lg shadow-lg">
      {filters
        .filter((section) => section.options && section.options.length > 0)
        .map((section) => (
          <Disclosure
            as="div"
            key={section.id}
            defaultOpen={
              section.id === "subcategory" ||
              section.id === "type" ||
              section.id === "brand"
            }
            className="border-b border-gray-700 py-4"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-gray-800 py-3 px-4 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition">
                    <span className="font-medium text-indigo-400">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <PlusIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-4">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          value={option.value}
                          type="checkbox"
                          checked={
                            section.id === "category"
                              ? selectedCategory === option.value
                              : option.checked
                          }
                          onChange={(e) => handleFilter(e, section, option)}
                          className="h-4 w-4 rounded border-gray-600 text-indigo-500 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-400"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
    </form>
  );
}

function ProductGrid({ products, status, isCustomBuilt }) {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {isCustomBuilt ? (
          // WebView or iframe for 'Custom Built' option
          <div className="w-full h-full flex justify-center items-center">
            <iframe
              src="https://forms.gle/uwFXfiKHNd53Zojv5"
              title="Custom Built Products"
              className="w-full h-screen border-none rounded-lg shadow-xl"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {status === "loading" ? (
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
            ) : null}

            {products.map((product) => (
              <Link to={`/product-detail/${product.id}`} key={product.id}>
                <div className="group relative p-4 rounded-lg bg-gray-800 hover:bg-gray-700 shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-900">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-contain object-center group-hover:opacity-90"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-indigo-400 truncate">
                      {product.title}
                    </h3>
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-sm font-semibold text-indigo-100">
                        ₹{product.discountPrice}
                      </p>
                      <p className="text-xs line-through text-gray-500">
                        ₹{product.price}
                      </p>
                    </div>
                    {product.stock <= 0 && (
                      <p className="mt-2 text-sm text-red-500">Out of stock</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
