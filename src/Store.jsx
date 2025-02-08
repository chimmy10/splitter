import { configureStore } from "@reduxjs/toolkit";
import tipReducer from "./Slice";

export const store = configureStore({
	reducer: {
		tip: tipReducer,
	},
});
