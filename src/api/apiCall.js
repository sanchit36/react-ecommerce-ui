import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
} from "../redux/userReducer";
import storeApi from "./store-api";

export const authUser = async (dispatch, routeName, userCredentials, cb) => {
  dispatch(loginStart());
  try {
    const response = await storeApi.post(routeName, userCredentials);
    localStorage.setItem("token", response.data.token);
    dispatch(loginSuccess(response.data));
    if (cb) cb();
  } catch (err) {
    console.log({ err });
    let error = err;
    if (!error.response) {
      throw err;
    }
    dispatch(loginFailure(error.response.data));
  }
};

export const logoutUser = async (dispatch) => {
  dispatch(logoutStart());
  try {
    await storeApi.post("/auth/signout");
    localStorage.removeItem("token");
    dispatch(logoutSuccess({ user: null, token: null }));
  } catch (err) {
    let error = err;
    if (!error.response) {
      throw err;
    }
    return dispatch(logoutFailure(error.response.data));
  }
};

export const getUser = async (dispatch, token) => {
  dispatch(getUserStart());
  try {
    const response = await storeApi.get("/users/me");
    dispatch(getUserSuccess({ user: response.data, token }));
  } catch (err) {
    console.log(err);
    let error = err;
    if (!error.response) {
      throw err;
    }
    dispatch(getUserFailure(error.response.data));
  }
};
