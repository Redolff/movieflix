import { configureStore } from "@reduxjs/toolkit";
import currentProfileReducer from "../slices/profileSlice";

const savedUser = JSON.parse(localStorage.getItem('user-movieflix'))
const preloadedState = savedUser?.currentProfile
    ? { currentProfile: savedUser.currentProfile }
    : undefined

export const store = configureStore({
    reducer: {
        currentProfile: currentProfileReducer,
    },
    preloadedState,
})