"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Service {
  id: number;
  title: string;
  description: string;
  href: string;
  images: { filePath: string }[];
  createdAt: string;
}

export const ServiceApi = createApi({
  reducerPath: "ServiceApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"}/admin/services`,
  }),

  tagTypes: ["Service"],

  endpoints: (builder) => ({
    // 🔹 Obtener todos los servicios
    getServices: builder.query<Service[], void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
  }),
});

export const { useGetServicesQuery } = ServiceApi;
