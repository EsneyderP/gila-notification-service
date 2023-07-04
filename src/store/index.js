import { configureStore } from "@reduxjs/toolkit";

// reducer
import logHistories from "./slices/logHistories";
import categories from "./slices/categories";

export default configureStore({
    reducer: {
        logHistories,
        categories,
    },
});
