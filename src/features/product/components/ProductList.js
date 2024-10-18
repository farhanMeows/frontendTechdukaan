import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBrandsAsync,
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
} from "../productAtoms/productAtoms";
import { useRecoilState } from "recoil";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
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
  const [rams, setRams] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [isCustomBuilt, setIsCustomBuilt] = useState(false);
  const [isCategorySelected, setIsCategorySelected] = useRecoilState(
    isCategorySelectedAtom
  );
  const [selectedCategory, setSelectedCategory] =
    useRecoilState(selectedCategoryAtom);
  const [selectedCategoryId, setSelectedCategoryId] = useRecoilState(
    selectedCategoryIdAtom
  );

  const filters = [
    {
      id: "subcategory",
      name: "Subcategory",
      options: subcategories,
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
  ];
  const handleFilter = (e, section, option) => {
    // Create a new filter object immutably
    const newFilter = { ...filter };

    // Handle subcategory filter
    if (section.id === "subcategory") {
      console.log(option.value);
      if (option.value === "Custom Built") {
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
    else if (["ram", "processor", "specification"].includes(section.id)) {
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
    <div className="bg-white">
      <div>
        <MobileFilter
          handleFilter={handleFilter}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        ></MobileFilter>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={(e) => handleSort(e, option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
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

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
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
              ></DesktopFilter>
              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductGrid
                  products={products}
                  status={status}
                  isCustomBuilt={isCustomBuilt}
                ></ProductGrid>
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
          ></Pagination>
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
  setSelectedCategory,
  filter,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    defaultOpen={true}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                {section.id === "category" ? (
                                  // Use checked for category options
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    value={option.value}
                                    type="checkbox"
                                    checked={selectedCategory === option.value}
                                    onChange={(e) =>
                                      handleFilter(e, section, option)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                ) : (
                                  // Use defaultChecked for other options
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    value={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    onChange={(e) =>
                                      handleFilter(e, section, option)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                )}
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
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
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          defaultOpen={true}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      {section.id === "category" ? (
                        // Use checked for category options
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          value={option.value}
                          type="checkbox"
                          checked={selectedCategory === option.value}
                          onChange={(e) => {
                            // Check the checkbox (select)
                            handleFilter(e, section, option);
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      ) : (
                        // Use defaultChecked for other options
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          value={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          onChange={(e) => handleFilter(e, section, option)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      )}
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
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
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {isCustomBuilt ? (
          // WebView or iframe for 'Custom Built' option
          <div className="w-full h-full flex justify-center items-center">
            <iframe
              src="https://forms.gle/uwFXfiKHNd53Zojv5"
              title="Custom Built Products"
              className="w-full h-screen border-none"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {status === "loading" ? (
              <Grid
                height="80"
                width="80"
                color="rgb(79, 70, 229) "
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : null}

            {products.map((product) => (
              <Link to={`/product-detail/${product.id}`} key={product.id}>
                <div className="group relative border-solid border p-4 rounded-lg shadow-lg transition hover:shadow-3xl transform hover:scale-110">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white group-hover:opacity-90">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-contain object-center"
                    />
                  </div>
                  <div className="mt-4 flex flex-col">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {product.title}
                    </h3>
                    <p className="mt-1 flex items-center text-yellow-500">
                      {/* <StarIcon className="w-5 h-5" /> */}
                      {/* <span className="ml-1 text-sm">{product.rating}</span> */}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-sm font-semibold text-gray-900">
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
