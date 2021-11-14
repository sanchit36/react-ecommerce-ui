import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, { payload }) => {
      const isPresent = state.products.findIndex(
        (product) => product.id === payload.id
      );

      if (isPresent === -1) {
        state.products.push(payload);
      } else {
        state.products[isPresent].quantity += payload.quantity;
      }

      state.quantity += isPresent === -1 ? 1 : 0;
      state.total += payload.price * payload.quantity;
    },
    removeProduct: (state, { payload }) => {
      const isPresent = payload.index;

      state.products[isPresent].quantity -= 1;
      state.total -= payload.price;
    },
    deleteProduct: (state, { payload }) => {
      const isPresent = payload.index;
      state.products.pop(isPresent);
      state.quantity -= 1;
      state.total -= 0;
    },
  },
});

export const { addProduct, removeProduct, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;
