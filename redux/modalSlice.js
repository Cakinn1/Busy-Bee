import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupModalOpen: false,
  loginModalOpen: false,
  commentModalOpen: false,
  stripeModeOpen: false,

  commentTweetDetails: {
    id: null,
    tweet: null,
    photoUrl: null,
    name: null,
    username: null,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignupModal: (state) => {
      state.signupModalOpen = true;
    },
    closeSignupModal: (state) => {
      state.signupModalOpen = false;
    },
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },
    openCommentModal: (state) => {
      state.commentModalOpen = true;
    },
    closeCommentModal: (state) => {
      state.commentModalOpen = false;
    },
    closeStripModal: (state) => {
      state.stripeModeOpen = false;
    },
    openStripModal: (state) => {
      state.stripeModeOpen = true;
    },

    setCommentTweet: (state, action) => {
      state.commentTweetDetails.username = action.payload.username;
      state.commentTweetDetails.name = action.payload.name;
      state.commentTweetDetails.id = action.payload.id;
      state.commentTweetDetails.photoUrl = action.payload.photoUrl;
      state.commentTweetDetails.tweet = action.payload.tweet;
    },
  },
});

export const {
  openSignupModal,
  closeSignupModal,
  closeLoginModal,
  openLoginModal,
  closeCommentModal,
  openCommentModal,
  setCommentTweet,
  openStripModal,
  closeStripModal,
} = modalSlice.actions;

export default modalSlice.reducer;
