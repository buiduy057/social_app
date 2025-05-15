// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import loading from "../features/loadingSlice";

const store = configureStore({
  reducer: {
    loading: loading,
  },
});

export default store;
