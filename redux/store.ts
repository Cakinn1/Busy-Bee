import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import userSlice from "./userSlice";
import themeSlice from "./themeSlice";
import commentSlice from "./commentSlice";

export const store = configureStore({
  reducer: {
    modals: modalSlice,
    user: userSlice,
    theme: themeSlice,
    comment: commentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
