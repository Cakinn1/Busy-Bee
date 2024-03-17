import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  name: null,
  email: null,
  uid: null,
  photoUrl: null,
  badge: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.photoUrl = action.payload.photoUrl;
      state.badge = action.payload.badge;
    },
    signOutUser: (state) => {
      (state.username = null),
        (state.name = null),
        (state.email = null),
        (state.uid = null),
        (state.photoUrl = null),
        (state.badge = null);
    },
    updateBadge: (state, action) => {
      return { ...state, badge: action.payload };
    },
  },
});

export const { setUser, signOutUser, updateBadge } = userSlice.actions;

export default userSlice.reducer;
