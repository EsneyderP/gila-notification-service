import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../constants";

// Async thunk to fetch log histories
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories", // Action type prefix
    async () => {
        const response = await axios.get(
            `${API_URL}/categories`
        );
        return response.data;
    }
);
