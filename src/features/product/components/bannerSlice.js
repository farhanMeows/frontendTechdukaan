import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBanner as fetchBannerApi,
  updateBanner as updateBannerApi,
} from "./bannerApi";

// Async thunks
export const fetchBanner = createAsyncThunk("banner/fetchBanner", async () => {
  const response = await fetchBannerApi();
  return response; // No need to wrap it in an array if it's a single object
});

export const updateBanner = createAsyncThunk(
  "banner/updateBanner",
  async (bannerData) => {
    const data = await updateBannerApi(bannerData);
    return data;
  }
);

// Create a slice
const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banners: {}, // Change this from an array to an object
    currentBanner: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload; // This will now directly be the banner object
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBanner = action.payload;
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectBanner = (state) => state.banner.currentBanner;
export const selectLoading = (state) => state.banner.loading;
export const selectError = (state) => state.banner.error;

export default bannerSlice.reducer;
