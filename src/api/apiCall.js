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
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} from "../redux/userReducer";

import storeApi from "./store-api";

// Auth User
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

// Logout User
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

// Get User
export const getUser = async (dispatch, token) => {
  dispatch(getUserStart());
  try {
    const response = await storeApi.get("/users/me");
    const user = response.data;
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

// Get All user
export const getUsers = async (page = 1, dispatch) => {
  dispatch(getUsersStart());
  try {
    const response = await storeApi.get("/users");
    dispatch(getUsersSuccess(response.data));
    return;
  } catch (err) {
    console.log(err);
    let error = err;
    if (!error.response) {
      throw err;
    }
    dispatch(getUsersFailure(error.response.data));
  }
};

// Delete User
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await storeApi.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

// Update User
export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    // update
    const response = await storeApi.put("/users/" + id, user);
    dispatch(updateUserSuccess({ id, user: response.data }));
    return response.data;
  } catch (err) {
    let error = err;
    if (!error.response) {
      throw err;
    }
    dispatch(updateUserFailure(error.response.data));
    throw new Error(error.response.data.message);
  }
};

// Add User
export const addUser = async (user, dispatch, cb) => {
  dispatch(addUserStart());
  try {
    const res = await storeApi.post(`/users`, user);
    dispatch(addUserSuccess(res.data));
    if (cb) cb();
  } catch (err) {
    dispatch(addUserFailure());
  }
};

// GET product
export const getProducts = async (page = 1, dispatch, params) => {
  dispatch(getProductStart());
  try {
    console.log(params);
    const res = params
      ? await storeApi.get(`/products?page=${page}+${params}`)
      : await storeApi.get(`/products?page=${page}`);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

// Delete Product
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await storeApi.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

// Update Product
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const response = await storeApi.put("/products/" + id, product);
    dispatch(updateProductSuccess({ id, product: response.data }));
    return response.data;
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

// Add Product
export const addProduct = async (product, dispatch, cb) => {
  dispatch(addProductStart());
  try {
    const res = await storeApi.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
    if (cb) cb();
  } catch (err) {
    dispatch(addProductFailure());
  }
};
