import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrandsAsync,
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
  const [subcategories, setSubcategories] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const colors = [
    {
      name: "White",
      class: "bg-white",
      selectedClass: "ring-gray-400",
      id: "white",
    },
    {
      name: "Gray",
      class: "bg-gray-200",
      selectedClass: "ring-gray-400",
      id: "gray",
    },
    {
      name: "Black",
      class: "bg-gray-900",
      selectedClass: "ring-gray-900",
      id: "black",
    },
  ];

  const sizes = [
    { name: "XXS", inStock: true, id: "xxs" },
    { name: "XS", inStock: true, id: "xs" },
    { name: "S", inStock: true, id: "s" },
    { name: "M", inStock: true, id: "m" },
    { name: "L", inStock: true, id: "l" },
    { name: "XL", inStock: true, id: "xl" },
    { name: "2XL", inStock: true, id: "2xl" },
    { name: "3XL", inStock: true, id: "3xl" },
  ];

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
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("highlight1", selectedProduct.highlights[0]);
      setValue("highlight2", selectedProduct.highlights[1]);
      setValue("highlight3", selectedProduct.highlights[2]);
      setValue("highlight4", selectedProduct.highlights[3]);
      setValue(
        "sizes",
        selectedProduct.sizes.map((size) => size.id)
      );
      setValue(
        "colors",
        selectedProduct.colors.map((color) => color.id)
      );
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const product = { ...data };
          product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.thumbnail,
          ];
          product.highlights = [
            product.highlight1,
            product.highlight2,
            product.highlight3,
            product.highlight4,
          ];
          product.rating = 0;
          if (product.colors) {
            product.colors = product.colors.map((color) =>
              colors.find((clr) => clr.id === color)
            );
          }
          if (product.sizes) {
            product.sizes = product.sizes.map((size) =>
              sizes.find((sz) => sz.id === size)
            );
          }

          delete product["image1"];
          delete product["image2"];
          delete product["image3"];
          product.price = +product.price;
          product.stock = +product.stock;
          product.discountPercentage = +product.discountPercentage;

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

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register("stock", {
                      required: "Stock is required",
                    })}
                    id="stock"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

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
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    id="category"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose category</option>
                    {categories.map((category) => (
                      <option
                        value={category.id}
                        key={category.id}
                        className="text-black"
                      >
                        {category.value}
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
                      <option value={brand.id} key={brand.id}>
                        {brand.value}
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
                    {...register("subcategory", {
                      required: "Subcategory is required",
                    })}
                    id="subcategory"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose subcategory</option>
                    {subcategories.map((subcategory) => (
                      <option value={subcategory.id} key={subcategory.id}>
                        {subcategory.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="specification"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Specifications - Ram
                </label>
                <div className="mt-2">
                  <select
                    {...register("specification", {
                      required: "Specification is required",
                    })}
                    id="specification"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose specification</option>
                    {specifications.map((specification) => (
                      <option value={specification.id} key={specification.id}>
                        {specification.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="specification"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Specifications - processor
                </label>
                <div className="mt-2">
                  <select
                    {...register("specification", {
                      required: "Specification is required",
                    })}
                    id="specification"
                    className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose specification</option>
                    {specifications.map((specification) => (
                      <option value={specification.id} key={specification.id}>
                        {specification.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
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
            </div>
          </div>
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
