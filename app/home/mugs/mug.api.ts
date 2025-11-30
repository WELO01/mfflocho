/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { baseQueryWithReauth } from "@/src/store/basequery";
import { createApi } from "@reduxjs/toolkit/query/react";


export interface CreateMugPayload {
  finalImageUrl: string;   // URL de la imagen generada (render de Konva o html2canvas)
  customText?: string;     // Texto opcional
  mugColor: string;        // blanco, negro, rosa, etc.
  size: string;            // 11oz o 15oz
  price: number;           // calculado antes de enviar
}

export interface CustomMugOrder {
  id: string;
  finalImageUrl: string;
  customText?: string;
  mugColor: string;
  size: string;
  price: number;
  createdAt: string;
}

export const MugApi = createApi({
  reducerPath: "MugApi",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    // ⭐ CREAR TAZA PERSONALIZADA
    createCustomMug: builder.mutation<CustomMugOrder, CreateMugPayload>({
      query: (payload) => ({
        url: "/mugs/custom",
        method: "POST",
        body: payload,
      }),
    }),

    // ⭐ OBTENER MIS TAZAS PERSONALIZADAS
    getMyCustomMugs: builder.query<CustomMugOrder[], void>({
      query: () => ({
        url: "/mugs/custom/my",
        method: "GET",
      }),
    }),

    // ⭐ OBTENER UNA TAZA PERSONALIZADA POR ID
    getCustomMugById: builder.query<CustomMugOrder, string>({
      query: (id) => ({
        url: `/mugs/custom/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCustomMugMutation,
  useGetMyCustomMugsQuery,
  useGetCustomMugByIdQuery,
} = MugApi;
