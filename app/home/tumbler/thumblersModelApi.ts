"use client";

import { baseQueryWithReauth } from "@/src/store/basequery";
import { createApi } from "@reduxjs/toolkit/query/react";

// -------------------------------------------------------------
// 🟦 Tipos
// -------------------------------------------------------------

export interface CreateTumblerOrderResponse {
  message: string;
  order: string;
  clientSecret: string;
  amount: number;
  total: number;
}

export interface TumblerModel {
  id: string;
  name: string;
  description?: string;
  capacityOz: number;
  color?: string;
  printableAreaWidth?: number;
  printableAreaHeight?: number;
  price: number;

  images: {
    id: number;
    fileName: string;
    filePath: string;
  };
}

// -------------------------------------------------------------
// 🟦 RTK API
// -------------------------------------------------------------

export const TumblerOrderApi = createApi({
  reducerPath: "tumblerOrderApi",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({

    // ⭐ CREATE ORDER → POST /tumbler/orders (FORM DATA)
    createTumblerOrder: builder.mutation<CreateTumblerOrderResponse, FormData>({
      query: (formData) => ({
        url: "/tumbler/orders",
        method: "POST",
        body: formData,
      }),
    }),

    // ⭐ GET MODELS → GET /tumbler/models
    getTumblerModels: builder.query<TumblerModel[], void>({
      query: () => ({
        url: "/tumbler/models",
        method: "GET",
      }),
    }),
  }),
});

// -------------------------------------------------------------
// 🟦 EXPORT HOOKS
// -------------------------------------------------------------
export const {
  useCreateTumblerOrderMutation,
  useGetTumblerModelsQuery,
} = TumblerOrderApi;
