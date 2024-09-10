import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginUsers: [],  
  isLoading: false, 
  error: null,      
};

const loginSlice = createSlice({
  name: "login", 
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.loginUsers = action.payload;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = loginSlice.actions;

export default loginSlice.reducer;
