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

import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "../redux/authReducer";

// Auth User
export const authUser = async (
  api,
  dispatch,
  routeName,
  userCredentials,
  cb
) => {
  dispatch(loginStart());
  try {
    const response = await api.post(routeName, userCredentials);
    const { user, token, cart } = response.data;

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
export const logoutUser = async (api, dispatch) => {
  dispatch(logoutStart());
  try {
    await api.post("/auth/signout");
    dispatch(logoutSuccess({ user: null, token: null }));
  } catch (err) {
    let error = err;
    if (!error.response) {
      throw err;
    }
    return dispatch(logoutFailure(error.response.data));
  }
};

// Get All user
export const getUsers = async (api, page = 1, dispatch) => {
  dispatch(getUsersStart());
  try {
    const response = await api.get(`/users?page${page}`);
    dispatch(getUsersSuccess(response.data));
    return;
  } catch (err) {
    let error = err;
    if (!error.response) {
      throw err;
    }
    dispatch(getUsersFailure(error.response.data));
  }
};

// Delete User
export const deleteUser = async (api, id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await api.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

// Update User
export const updateUser = async (api, id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    // update
    const response = await api.put("/users/" + id, user);
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
export const addUser = async (api, user, dispatch, cb) => {
  dispatch(addUserStart());
  try {
    const res = await api.post(`/users`, user);
    dispatch(addUserSuccess(res.data));
    if (cb) cb();
  } catch (err) {
    dispatch(addUserFailure());
  }
};

// GET product
export const getProducts = async (api, page = 1, dispatch, params) => {
  dispatch(getProductStart());
  try {
    const res = params
      ? await api.get(`/products?page=${page}+${params}`)
      : await api.get(`/products?page=${page}`);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

// Delete Product
export const deleteProduct = async (api, id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await api.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

// Update Product
export const updateProduct = async (api, id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const response = await api.put("/products/" + id, product);
    dispatch(updateProductSuccess({ id, product: response.data }));
    return response.data;
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

// Add Product
export const addProduct = async (api, product, dispatch, cb) => {
  dispatch(addProductStart());
  try {
    const res = await api.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
    if (cb) cb();
  } catch (err) {
    dispatch(addProductFailure());
  }
};
