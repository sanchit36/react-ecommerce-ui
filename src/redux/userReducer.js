import { createSlice } from "@reduxjs/toolkit";

const start = (state) => {
  state.isFetching = true;
};

const failure = (state, { payload: errorMessage }) => {
  state.isFetching = false;
  state.errorMessage = errorMessage.message;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    totalPages: 0,
    hasPrev: false,
    hasNext: false,
    users: [],
    isFetching: false,
    errorMessage: null,
  },
  reducers: {
    // Get all users
    getUsersStart: start,
    getUsersSuccess: (
      state,
      { payload: { users, hasNext, hasPrev, totalPages } }
    ) => {
      state.isFetching = false;
      state.errorMessage = null;
      state.users = users;
      state.hasNext = hasNext;
      state.hasPrev = hasPrev;
      state.totalPages = totalPages;
    },
    getUsersFailure: failure,
    //DELETE
    deleteUserStart: start,
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteUserFailure: failure,
    //UPDATE
    updateUserStart: start,
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users[
        state.users.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.user;
    },
    updateUserFailure: failure,
    //ADD
    addUserStart: start,
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload);
    },
    addUserFailure: failure,
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
