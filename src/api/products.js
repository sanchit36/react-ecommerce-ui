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
