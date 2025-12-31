import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "@/features/characters/slices/characterSlice";

export const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
});
