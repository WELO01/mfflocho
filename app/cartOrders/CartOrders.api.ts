/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { baseQueryWithReauth } from "@/src/store/basequery";
import { createApi } from "@reduxjs/toolkit/query/react";

// 👇 Usamos tu baseQuery existente, SIN modificarlo


// 📦 Tipo base de orden
export interface Order {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  type: string;
  serviceType: string | null;
}

// 🧠 API para manejar órdenes
export const OrdersApi = createApi({
  reducerPath: "OrdersApi",

  // 👇 Esta es la única línea importante
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    // 📋 Obtener todas las órdenes del usuario autenticado
    getUserOrders: builder.query<{ total: number; orders: Order[] }, void>({
      query: () => ({
        url: "/orders/my",
        method: "GET",
      }),
    }),

    // 🔍 Obtener una orden específica por ID
    getOrderById: builder.query<Order, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserOrdersQuery, useGetOrderByIdQuery } = OrdersApi;
