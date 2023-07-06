import { createSlice } from "@reduxjs/toolkit";
import { fetchLogHistories } from "./actions";

const initialState = {
    list: [],
    total: 0,
    currentPage: 1,
    loading: false,
    error: null,
    reset: false,
};

const logHistorySlice = createSlice({
  name: "logHistories",
  initialState,
  reducers: {
    resetLogHistories: (state) => {
        state.list = [];
        state.total = 0;
        state.reset = true;
        state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogHistories.pending, (state) => {
        state.loading = true; // Set loading to true when the async operation starts
        state.error = null;
        state.reset = false;
      })
      .addCase(fetchLogHistories.fulfilled, (state, action) => {
        state.list = [...state.list, ...action.payload.data];
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.loading = false; // Set loading to false when the async operation is fulfilled
        state.reset = false;
        state.error = null;
      })
      .addCase(fetchLogHistories.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the async operation is rejected
        state.error = action.error.message;
        state.reset = false;
    });
  },
});

export const { resetLogHistories } = logHistorySlice.actions;
export const fetchLogHistoriesAsync = fetchLogHistories;
export default logHistorySlice.reducer;
