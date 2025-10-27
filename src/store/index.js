import { configureStore } from "@reduxjs/toolkit";
import currentProfileReducer from "../slices/profileSlice";

export const store = configureStore({
    reducer: {
        currentProfile: currentProfileReducer,
    },
})