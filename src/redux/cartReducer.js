import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    getCart(state, { payload }) {
      state.products = payload.products;
      state.total = payload.total;
      state.quantity = payload.products.length;
    },
    resetCart(state) {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    addProductToCart: (state, { payload }) => {
      const existingCartItem = state.products.find(
        (cartItem) => cartItem.id === payload.id
      );

      if (existingCartItem) {
        existingCartItem.quantity += payload.quantity;
      } else {
        state.products.push(payload);
        state.quantity += 1;
      }
      state.total += payload.quantity * payload.price;
    },

    removeProductFromCart: (state, { payload }) => {
      const existingCartItem = state.products.findIndex(
        (cartItem) => cartItem.id === payload.id
      );

      if (existingCartItem !== -1) {
        if (state.products[existingCartItem].quantity > 1) {
          state.products[existingCartItem].quantity -= 1;
        } else {
          state.products.splice(existingCartItem, 1);
          state.quantity -= 1;
        }
        state.total -= payload.price;
      }
    },
    deleteProduct: (state, { payload }) => {
      const isPresent = payload.index;
      state.products.pop(isPresent);
      state.quantity -= 1;
      state.total -= 0;
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  deleteProduct,
  getCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
