"use client";

import { baseQueryWithReauth } from "@/src/store/basequery";
import { createApi } from "@reduxjs/toolkit/query/react";

// -------------------------------------------------------------
// 🟦 Tipos
// -------------------------------------------------------------

export interface CreateMugOrderResponse {
  message: string;
  order: string;
  clientSecret: string;
  amount: number;
  total: number;
}

export interface MugModel {
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

export const MugOrderApi = createApi({
  reducerPath: "mugOrderApi",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({

    // ⭐ CREATE ORDER → POST /mug/orders (FORM DATA)
    createMugOrder: builder.mutation<CreateMugOrderResponse, FormData>({
      query: (formData) => ({
        url: "/mug/orders",
        method: "POST",
        body: formData,
      }),
    }),

    // ⭐ GET MODELS → GET /mug/models
    getMugModels: builder.query<MugModel[], void>({
      query: () => ({
        url: "/mug/models",
        method: "GET",
      }),
    }),
  }),
});

// -------------------------------------------------------------
// 🟦 EXPORT HOOKS
// -------------------------------------------------------------
export const {
  useCreateMugOrderMutation,
  useGetMugModelsQuery,
} = MugOrderApi;
