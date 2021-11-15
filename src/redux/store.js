import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productApi } from "../services/product";

import cartReducer from "./cartReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  product: productReducer,
  [productApi.reducerPath]: productApi.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
