import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByFilters,
  fetchBrands,
  fetchRams,
  fetchCategories,
  fetchProductById,
  createProduct,
  updateProduct,
  fetchSubcategoriesByCategoryId,
  fetchSpecifications,
  fetchProcessors,
  fetchColours,
  fetchGraphics,
  fetchInkandcartridges,
  fetchSize,
  fetchStorages,
  fetchTypes,
} from "./productAPI";

const initialState = {
  subcategories: [],
  products: [],
  brands: [],
  rams: [],
  categories: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: null,
};

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({ filter, sort, pagination, admin }) => {
    const response = await fetchProductsByFilters(
      filter,
      sort,
      pagination,
      admin
    );
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async (categoryId) => {
    const response = await fetchBrands(categoryId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchColoursAsync = createAsyncThunk(
  "product/fetchColours",
  async (categoryId) => {
    const response = await fetchColours(categoryId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchGraphicsAsync = createAsyncThunk(
  "product/fetchGraphics",
  async (categoryId) => {
    const response = await fetchGraphics(categoryId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchInkandcartridgesAsync = createAsyncThunk(
  "product/fetchInkandcartridges",
  async (categoryId) => {
    const response = await fetchInkandcartridges(categoryId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchSizeAsync = createAsyncThunk(
  "product/fetchSize",
  async (categoryId) => {
    const response = await fetchSize(categoryId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchStoragesAsync = createAsyncThunk(
  "product/fetchStorages",
  async (categoryId) => {
    const response = await fetchStorages(categoryId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchTypesAsync = createAsyncThunk(
  "product/fetchTypes",
  async (categoryId) => {
    const response = await fetchTypes(categoryId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProcessorsAsync = createAsyncThunk(
  "product/fetchProcessors",
  async (categoryId) => {
    const response = await fetchProcessors(categoryId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchRamsAsync = createAsyncThunk(
  "product/fetchRams",
  async (categoryId) => {
    const response = await fetchRams(categoryId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchSpecificationsAsync = createAsyncThunk(
  "product/fetchSpecifications",
  async (categoryId) => {
    const response = await fetchSpecifications(categoryId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchSubcategoriesAsync = createAsyncThunk(
  "products/fetchSubcategories",
  async (categoryId) => {
    const response = await fetchSubcategoriesByCategoryId(categoryId);
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/create",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/update",
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearSubcategories(state) {
      state.subcategories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchColoursAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColoursAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.colours = action.payload;
      })
      .addCase(fetchGraphicsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGraphicsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.graphics = action.payload;
      })
      .addCase(fetchInkandcartridgesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInkandcartridgesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.inkandcartridges = action.payload;
      })
      .addCase(fetchSizeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSizeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.sizes = action.payload;
      })
      .addCase(fetchStoragesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoragesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.storages = action.payload;
      })
      .addCase(fetchTypesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTypesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.types = action.payload;
      })
      .addCase(fetchRamsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRamsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.rams = action.payload;
      })
      .addCase(fetchProcessorsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProcessorsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.processors = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchSubcategoriesAsync.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchSubcategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.subcategories = action.payload;
      })
      .addCase(fetchSpecificationsAsync.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchSpecificationsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.subcategories = action.payload;
      })

      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export const { clearSubcategories } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectColours = (state) => state.product.colours;
export const selectGraphics = (state) => state.product.graphics;
export const selectInkandcartridges = (state) => state.product.inkandcartridges;
export const selectSizes = (state) => state.product.sizes;
export const selectStorages = (state) => state.product.storages;
export const selectTypes = (state) => state.product.types;
export const selectRams = (state) => state.product.rams;
export const selectProcessors = (state) => state.product.processors;
export const selectCategories = (state) => state.product.categories;
export const selectSubcategories = (state) => state.products.subcategories;
export const selectSpecifications = (state) => state.products.specifications;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;

export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
