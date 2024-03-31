import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isHomeLoading: false,
};

const homeLoadingSlice = createSlice({
  name: "homeLoading",
  initialState,
  reducers: {
    isHomeLoadingTrue: (state) => {
      state.isHomeLoading = true;
    },
    isHomeLoadingFalse: (state) => {
      state.isHomeLoading = false;
    },
  },
});

export const { isHomeLoadingFalse, isHomeLoadingTrue } =
  homeLoadingSlice.actions;
export default homeLoadingSlice.reducer;
