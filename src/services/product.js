import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:5000/api/";

const createRequest = (url) => ({
  url,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (page = 1) => createRequest(`products?page=${page}`),
    }),
    getProductById: builder.query({
      query: (id) => createRequest(`products/${id}`),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
