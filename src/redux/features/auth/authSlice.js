import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState,
  reducers: {
    // Action: "auth/loginStart"
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    // Action: "auth/loginSuccess"
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Action: "auth/loginFailure"
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Action: "auth/logout"
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Export actions to be used in components
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Export reducer to be used in store
export default authSlice.reducer;