import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  username: null | string;
  name: null | string;
  email: null | string;
  uid: null | string;
  photoUrl: null | string;
  badge: null | string;
}

const initialState: InitialStateProps = {
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
  },
});

export const { setUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
