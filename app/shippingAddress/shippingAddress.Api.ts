/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import { baseQueryWithReauth } from "@/src/store/basequery";
import { createApi } from "@reduxjs/toolkit/query/react";


export interface ShippingAddress {
  id: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  primary: boolean;
}

export interface CreateAddressDto {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  primary?: boolean;
}

export interface UpdateAddressDto extends Partial<CreateAddressDto> {}

export const ShippingAddressApi = createApi({
  reducerPath: "ShippingAddressApi",

  // 🔥 Ahora sí usamos baseQueryWithReauth correctamente
  baseQuery: baseQueryWithReauth,

  tagTypes: ["ShippingAddress"],

  endpoints: (builder) => ({
    getAddresses: builder.query<ShippingAddress[], void>({
      query: () => "/shippingAddress",
      providesTags: ["ShippingAddress"],
    }),

    createAddress: builder.mutation<ShippingAddress, CreateAddressDto>({
      query: (body) => ({
        url: "/shippingAddress",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ShippingAddress"],
    }),

    updateAddress: builder.mutation<
      ShippingAddress,
      { id: string; data: UpdateAddressDto }
    >({
      query: ({ id, data }) => ({
        url: `/shippingAddress/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ShippingAddress"],
    }),

    deleteAddress: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/shippingAddress/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ShippingAddress"],
    }),

    setPrimaryAddress: builder.mutation<ShippingAddress, { id: string }>({
      query: ({ id }) => ({
        url: `/shippingAddress/primary/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ShippingAddress"],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetPrimaryAddressMutation,
} = ShippingAddressApi;
