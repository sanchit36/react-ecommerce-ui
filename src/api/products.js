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
} from '../redux/productReducer';

// GET product
export const getProducts = (api, page = 1, params) => {
  return async (dispatch) => {
    dispatch(getProductStart());
    try {
      const res = params
        ? await api.get(`/products?page=${page}+${params}`)
        : await api.get(`/products?page=${page}`);
      dispatch(getProductSuccess(res.data));
    } catch (err) {
      dispatch(getProductFailure());
      return Promise.reject(err && err.response && err.response.data);
    }
  };
};

// Delete Product
export const deleteProduct = (api, id) => {
  return async (dispatch) => {
    dispatch(deleteProductStart());
    try {
      await api.delete(`/products/${id}`);
      dispatch(deleteProductSuccess(id));
    } catch (err) {
      dispatch(deleteProductFailure());
      return Promise.reject(err && err.response && err.response.data);
    }
  };
};

// Update Product
export const updateProduct = (api, id, product) => {
  return async (dispatch) => {
    dispatch(updateProductStart());
    try {
      // update
      const response = await api.put('/products/' + id, product);
      dispatch(updateProductSuccess({ id, product: response.data }));
      return response.data;
    } catch (err) {
      dispatch(updateProductFailure());
      return Promise.reject(err && err.response && err.response.data);
    }
  };
};

// Add Product
export const addProduct = (api, product, cb) => {
  return async (dispatch) => {
    dispatch(addProductStart());
    try {
      const res = await api.post(`/products`, product);
      dispatch(addProductSuccess(res.data));
      if (cb) cb();
    } catch (err) {
      dispatch(addProductFailure());
      return Promise.reject(err && err.response && err.response.data);
    }
  };
};
