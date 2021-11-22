import { createSlice } from "@reduxjs/toolkit";

const start = (state) => {
  state.isFetching = true;
};

const success = (state, { payload: { user, token } }) => {
  state.isFetching = false;
  state.errorMessage = null;
  state.currentUser = user;
  state.token = token;
};

const failure = (state, { payload: errorMessage }) => {
  state.isFetching = false;
  state.errorMessage = errorMessage.message;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    token: null,
    isFetching: false,
    errorMessage: null,
  },
  reducers: {
    // Login
    loginStart: start,
    loginSuccess: success,
    loginFailure: failure,
    // Logout
    logoutStart: start,
    logoutSuccess: success,
    logoutFailure: success,
    // setToken
    setUser: (state, { payload }) => {
      state.token = payload.token;
      state.currentUser = payload.user;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  setUser,
} = userSlice.actions;

export default userSlice.reducer;
