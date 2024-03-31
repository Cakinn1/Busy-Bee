import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import userSlice from "./userSlice";
import themeSlice from "./themeSlice";
import homeLoadingSlice from "./homeLoadingSlice";

export const store = configureStore({
  reducer: {
    modals: modalSlice,
    user: userSlice,
    theme: themeSlice,
    homeLoading: homeLoadingSlice,
  },
});
