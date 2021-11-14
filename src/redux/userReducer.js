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
    loginStart: start,
    loginSuccess: success,
    loginFailure: failure,
    logoutStart: start,
    logoutSuccess: success,
    logoutFailure: success,
    getUserStart: start,
    getUserSuccess: success,
    getUserFailure: success,
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
