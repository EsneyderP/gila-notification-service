import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../constants";

// Async thunk to fetch log histories
export const fetchLogHistories = createAsyncThunk(
    "logHistories/fetchLogHistories", // Action type prefix
    async ({ page = 1, limit = 10 }) => {
        const response = await axios.get(
            `${API_URL}/notifications?limit=${limit}&page=${page}`
        );
        return response.data;
    }
);
