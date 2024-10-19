import { useDispatch, useSelector } from "react-redux";
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
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
  fetchSpecificationsAsync,
  fetchSubcategoriesAsync,
} from "../../product/productSlice";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import { useAlert } from "react-alert";
import { ServerStackIcon } from "@heroicons/react/24/outline";

function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);
  const [openModal, setOpenModal] = useState(false);
  const alert = useAlert();
  const [brands, setBrands] = useState([]);
  const [colours, setColours] = useState([]);
  const [graphics, setGraphics] = useState([]);
  const [inkandcartridges, setInkandcartridges] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [storages, setStorages] = useState([]);
  const [types, setTypes] = useState([]);
  const [rams, setRams] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [specifications, setSpecifications] = useState([]);

  // const colors = [
  //   {
  //     name: "White",
  //     class: "bg-white",
  //     selectedClass: "ring-gray-400",
  //     id: "white",
  //   },
  //   {
  //     name: "Gray",
  //     class: "bg-gray-200",
  //     selectedClass: "ring-gray-400",
  //     id: "gray",
  //   },
  //   {
  //     name: "Black",
  //     class: "bg-gray-900",
  //     selectedClass: "ring-gray-900",
  //     id: "black",
  //   },
  // ];

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  // Load brands, subcategories, and specifications when a category is selected
  const handleCategoryChange = (categoryId) => {
    if (categoryId) {
      fetchBrands(categoryId);
      fetchSubcategories(categoryId);
      fetchSpecifications(categoryId);
      fetchProcessors(categoryId);
      fetchRams(categoryId);
      fetchColours(categoryId);
      fetchGraphics(categoryId);
      fetchInkandcartridges(categoryId);
      fetchSize(categoryId);
      fetchStorages(categoryId);
      fetchTypes(categoryId);
    }
  };

  const fetchColours = async (categoryId) => {
    const response = await dispatch(fetchColoursAsync(categoryId)); // Fix here
    if (response.meta.requestStatus === "fulfilled") {
      const fetchedColours = response.payload;

      if (Array.isArray(fetchedColours)) {
        setColours(fetchedColours);
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
  const fetchBrands = async (categoryId) => {
    const response = await dispatch(fetchBrandsAsync(categoryId));
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
    const response = await dispatch(fetchRamsAsync(categoryId));
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
    const response = await dispatch(fetchProcessorsAsync(categoryId));
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

  const fetchSubcategories = async (categoryId) => {
    const response = await dispatch(fetchSubcategoriesAsync(categoryId));
    if (response.meta.requestStatus === "fulfilled") {
      const fetchedSubcategories = response.payload;
      if (Array.isArray(fetchedSubcategories)) {
        setSubcategories(fetchedSubcategories);
      } else {
        console.error("Expected an array but got:", fetchedSubcategories);
        setSubcategories([]);
      }
    }
  };

  const fetchSpecifications = async (categoryId) => {
    const response = await dispatch(fetchSpecificationsAsync(categoryId));
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

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("stock", selectedProduct.stock);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      // setValue("brand", selectedProduct.brand);
      // setValue("category", selectedProduct.category);
      // setValue("Subcategory", selectedProduct.subcategory);
      // setValue("Ram", selectedProduct.ram);
      // setValue("processor", selectedProduct.processor);
      setValue("highlight1", selectedProduct.highlights[0]);
      setValue("highlight2", selectedProduct.highlights[1]);
      setValue("highlight3", selectedProduct.highlights[2]);
      setValue("highlight4", selectedProduct.highlights[3]);
      // setValue(
      //   "sizes",
      //   selectedProduct.sizes.map((size) => size.id)
      // );
      // setValue(
      //   "colors",
      //   selectedProduct.colors.map((color) => color.id)
      // );
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
  };

  const handleUpdateDeleted = () => {
    const product = { ...selectedProduct };
    product.deleted = false;
    dispatch(updateProductAsync(product));
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          console.log("data", data);
          const product = { ...data };

          product.images = [
            // product.image1,
            // product.image2,
            // product.image3,
            product.thumbnail,
          ];
          product.highlights = [
            product.highlight1,
            product.highlight2,
            product.highlight3,
            product.highlight4,
          ];
          // product.rating = 0;
          // if (product.colors) {
          //   product.colors = product.colors.map((color) =>
          //     colors.find((clr) => clr.id === color)
          //   );
          // }
          // if (product.sizes) {
          //   product.sizes = product.sizes.map((size) =>
          //     sizes.find((sz) => sz.id === size)
          //   );
          // }
          // Ensure subcategory and specification are correctly assigned
          product.subCategory = product.subcategory; // Use consistent casing if necessary
          product.category = product.category; // Handle singular case
          product.ram = product.ram; // Handle singular case
          console.log(product.ram);

          product.processor = product.processor; // Handle singular case

          delete product["image1"];
          delete product["image2"];
          delete product["image3"];
          product.price = +product.price;
          product.stock = +product.stock;
          product.discountPercentage = +product.discountPercentage;
          console.log(product);
          if (params.id) {
            product.id = params.id;
            product.rating = selectedProduct.rating || 0;
            dispatch(updateProductAsync(product));
            alert.success("Product Updated");

            reset();
          } else {
            dispatch(createProductAsync(product));
            alert.success("Product Created");
            reset();
          }
        })}
      >
        <div className="space-y-12 bg-white p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {selectedProduct && selectedProduct.deleted && (
                <h2 className="text-red-500 sm:col-span-6">
                  This product is deleted
                </h2>
              )}

              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("title", {
                        required: "name is required",
                      })}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about product.
                </p>
              </div>

              {/* <div className="col-span-full">
                <label
                  htmlFor="colors"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Colors
                </label>
                <div className="mt-2">
                  {colors.map((color) => (
                    <>
                      <input
                        type="checkbox"
                        {...register("colors", {})}
                        key={color.id}
                        value={color.id}
                      />{" "}
                      {color.name}
                    </>
                  ))}
                </div>
              </div> */}

              {/* <div className="col-span-full">
                <label
                  htmlFor="sizes"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sizes
                </label>
                <div className="mt-2">
                  {sizes.map((size) => (
                    <>
                      <input
                        type="checkbox"
                        {...register("sizes", {})}
                        key={size.id}
                        value={size.id}
                      />{" "}
                      {size.name}
                    </>
                  ))}
                </div>
              </div> */}

              <div className="sm:col-span-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    onChange={(e) => {
                      const selectedOption =
                        e.target.options[e.target.selectedIndex];
                      const selectedValue = selectedOption.value;
                      const selectedId = selectedOption.getAttribute("data-id");
                      handleCategoryChange(selectedId); // Pass id to handleCategoryChange
                    }}
                    id="category"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose category</option>
                    {categories.map((category) => (
                      <option
                        value={category.value} // This is for form submission
                        data-id={category.id} // This is for accessing the id in onChange
                        key={category.id}
                        className="text-black"
                      >
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    {...register("brand", {
                      required: "Brand is required",
                    })}
                    id="brand"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose brand</option>
                    {brands.map((brand) => (
                      <option value={brand.value} key={brand.id}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="Colour"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Colour
                </label>
                <div className="mt-2">
                  <select
                    {...register("colour", {})}
                    id="Colour"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose colour</option>
                    {colours.map((colour) => (
                      <option value={colour.value} key={colour.id}>
                        {colour.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="graphic"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  graphic
                </label>
                <div className="mt-2">
                  <select
                    {...register("graphic", {})}
                    id="graphic"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose graphic</option>
                    {graphics.map((graphic) => (
                      <option value={graphic.value} key={graphic.id}>
                        {graphic.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="inkandcartridges"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  inkandcartridges
                </label>
                <div className="mt-2">
                  <select
                    {...register("inkandcartridges", {})}
                    id="inkandcartridges"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose inkandcartridges</option>
                    {inkandcartridges.map((brand) => (
                      <option value={brand.value} key={brand.id}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="size"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  size
                </label>
                <div className="mt-2">
                  <select
                    {...register("size", {})}
                    id="size"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose size</option>
                    {sizes.map((size) => (
                      <option value={size.value} key={size.id}>
                        {size.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="storage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  storage
                </label>
                <div className="mt-2">
                  <select
                    {...register("storage", {})}
                    id="storage"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose storage</option>
                    {storages.map((brand) => (
                      <option value={brand.value} key={brand.id}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  type
                </label>
                <div className="mt-2">
                  <select
                    {...register("type", {})}
                    id="type"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose type</option>
                    {types.map((brand) => (
                      <option value={brand.value} key={brand.id}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="subcategory"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Subcategory
                </label>
                <div className="mt-2">
                  <select
                    {...register("subcategory", {})}
                    id="subcategory"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose subcategory</option>
                    {subcategories.map((subcategory) => (
                      <option value={subcategory.value} key={subcategory.id}>
                        {subcategory.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="ram"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ram
                </label>
                <div className="mt-2">
                  <select
                    {...register("ram", {})}
                    id="ram"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose Ram</option>
                    {rams.map((ram) => (
                      <option value={ram.value} key={ram.id}>
                        {ram.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="processor"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Processor
                </label>
                <div className="mt-2">
                  <select
                    {...register("processor", {})}
                    id="processor"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose Processor</option>
                    {processors.map((processor) => (
                      <option value={processor.value} key={processor.id}>
                        {processor.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("price", {
                        required: "price is required",
                        min: 1,
                        max: 1000000000,
                      })}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("discountPercentage", {
                        required: "discountPercentage is required",
                        min: 0,
                        max: 100,
                      })}
                      id="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("stock", {
                        required: "stock is required",
                        min: 0,
                      })}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail Image
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("thumbnail", {
                        required: "thumbnail is required",
                      })}
                      id="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* <div className="sm:col-span-6">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image1", {
                        required: "image1 is required",
                      })}
                      id="image1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image2", {
                        required: "image is required",
                      })}
                      id="image2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image3", {
                        required: "image is required",
                      })}
                      id="image3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div> */}

              <div className="sm:col-span-6">
                <label
                  htmlFor="highlight1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlight 1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("highlight1", {})}
                      id="highlight1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="highlight2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlight 2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("highlight2", {})}
                      id="highlight2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="highlight3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlight 3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("highlight3", {})}
                      id="highlight3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="highlight4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlight 4
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("highlight4", {})}
                      id="highlight4"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Extra{" "}
            </h2>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div> */}
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>

          {selectedProduct && !selectedProduct.deleted && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          )}

          <button
            onClick={handleUpdateDeleted}
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      {selectedProduct && (
        <Modal
          title={`Delete ${selectedProduct.title}`}
          message="Are you sure you want to delete this Product ?"
          dangerOption="Delete"
          cancelOption="Cancel"
          dangerAction={handleDelete}
          cancelAction={() => setOpenModal(null)}
          showModal={openModal}
        ></Modal>
      )}
    </>
  );
}

export default ProductForm;
