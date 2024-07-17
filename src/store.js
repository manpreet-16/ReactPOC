import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./shared/features/restaurant/restaurantSlice";

export const store = configureStore({
    reducer : {
        restaurant : restaurantReducer
    }
})