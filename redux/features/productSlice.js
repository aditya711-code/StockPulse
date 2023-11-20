import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URLS } from "@/utils/constant";
const initialState = {
  data: null,
  loading: "idle",
  error: null,
};
export const fetchProductDetails = createAsyncThunk(
  "productDetails/fetchData",
  async (symbol) => {
    const url = API_URLS.getCompanyOverview(symbol);
    const config = { headers: { "User-Agent": "request" } };
    const response = await fetch(url, config);

    if (!response.ok || response.Information) {
      throw new Error("Request failed");
    }
    const data = await response.json();

    return data;
  }
);

const ProductDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    updateLoading: (state, action) => {
      if (action.payload) {
        state.loading = "succeeded";
      } else {
        state.loading = state.loading;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        (state.loading = "failed"), (state.error = action.error.message);
      });
  },
});
export const { updateLoading, updateState } = ProductDetailsSlice.actions;
export default ProductDetailsSlice.reducer;
