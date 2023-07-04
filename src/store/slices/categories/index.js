import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./actions";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true; // Set loading to true when the async operation starts
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.list = action.payload.data;
        state.loading = false; // Set loading to false when the async operation is fulfilled
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the async operation is rejected
        state.error = action.error.message;
      });
  },
});

export const fetchCategoriesAsync = fetchCategories;
export default categorySlice.reducer;
