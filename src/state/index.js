import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  mode: "dark",
};

export const globalSlice = createSlice({
  name: "global",
  intialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "light" : "dark";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
