import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // null = closed, "login" or "signup" = which auth form to show
  authModal: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAuthModal: (state, action) => {
      // action.payload should be "login" or "signup"
      state.authModal = action.payload || "login";
    },
    closeAuthModal: (state) => {
      state.authModal = null;
    },
  },
});

export const { openAuthModal, closeAuthModal } = uiSlice.actions;

export default uiSlice.reducer;
