import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  signupModalOpen: boolean;
  loginModalOpen: boolean;
  commentModalOpen: boolean;
  stripeModeOpen: boolean;
}

const initialState: InitialStateProps = {
  signupModalOpen: false,
  loginModalOpen: false,
  commentModalOpen: false,
  stripeModeOpen: false,
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
  },
});

export const {
  openSignupModal,
  closeSignupModal,
  closeLoginModal,
  openLoginModal,
  closeCommentModal,
  openCommentModal,
  openStripModal,
  closeStripModal,
} = modalSlice.actions;

export default modalSlice.reducer;
