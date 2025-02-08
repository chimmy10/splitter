import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	bill: "",
	people: "",
	percent: 0,
	custom: "", // Make sure custom is part of the initial state
};

const tipSlice = createSlice({
	name: "tip",
	initialState,
	reducers: {
		setBill(state, action) {
			state.bill = action.payload;
		},
		setPeople(state, action) {
			state.people = action.payload;
		},
		setPercent: (state, action) => {
			state.percent = action.payload;
			state.custom = "";
		},
		setCustom: (state, action) => {
			state.custom = action.payload;
			state.percent = 0;
		},
		setReset: (state) => {
			state.bill = "";
			state.people = "";
			state.percent = 0;
			state.custom = ""; // Reset custom explicitly
		},
	},
});

export const { setBill, setPeople, setPercent, setCustom, setReset } =
	tipSlice.actions;

export default tipSlice.reducer;
