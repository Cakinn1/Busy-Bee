import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { isDarkMode: boolean } = {
  isDarkMode: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    systemTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleTheme, systemTheme } = themeSlice.actions;
export default themeSlice.reducer;
