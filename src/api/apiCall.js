import { getCart } from "../redux/cartReducer";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "../redux/productReducer";

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
    const { user, token, cart } = response.data;
    localStorage.setItem("token", token);
    dispatch(loginSuccess({ user, token }));
    dispatch(getCart(cart));
    if (cb) cb();
    return response.data;
  } catch (err) {
    let error = err;
    if (!error.response) {
      throw new Error(err);
    }
    dispatch(loginFailure(error?.response?.data));
    throw new Error(error.response.data.message);
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
    const user = response.data;
    console.log(user);
    dispatch(getUserSuccess({ user, token }));
    return { user };
  } catch (err) {
    console.log(err);
    let error = err;
    if (!error.response) {
      throw err;
    }
    dispatch(getUserFailure(error.response.data));
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await storeApi.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await storeApi.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
