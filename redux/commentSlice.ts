import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  id: null | string;
  tweet: null | string;
  photoUrl: null | string;
  name: null | string;
  username: null | string;
}

const initialState: InitialStateProps = {
  id: null,
  tweet: null,
  photoUrl: null,
  name: null,
  username: null,
};

const commentSlice = createSlice({
  initialState,
  name: "comment",
  reducers: {
    setCommentTweet: (state, action: PayloadAction<InitialStateProps>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.photoUrl = action.payload.photoUrl;
      state.tweet = action.payload.tweet;
      state.username = action.payload.username;
    },
  },
});

export const { setCommentTweet } = commentSlice.actions;

export default commentSlice.reducer;
